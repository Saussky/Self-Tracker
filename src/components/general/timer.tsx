import React, { useEffect, useRef, useState } from 'react'
import { DateTime } from 'luxon'
import styles from '../../styles/general/Box.module.css'
import Expand from './expand'
import { TimerInfo } from './general'

interface TimerProps {
    key: string,
    info: TimerInfo
}

async function createDBEntry(token: string, id: string) {
    try {
        const response = await fetch('/api/general/timers/timer-data/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, id }),
        })

        if (response.status === 200) {
            console.log("IT'S ALIVE")
            const data = await response.json();
            return data.UUID
        }
    } catch (e) {
        console.log(e)
    }
}

async function updateDBTime(token: string, uniqueId: string, timeElapsed: number) {
    try {
        const response = await fetch('/api/general/timers/timer-data/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, uniqueId, timeElapsed }),
        })

        if (response.status === 200) {
            console.log("TIME UPDATED!")
        }
    } catch (e) {
        console.log(e)
    }
}

async function checkForExistingTimer(token: string, info_id: string) {
    try {
        const response = await fetch(`/api/general/timers/timer-data/check?token=${token}&info_id=${info_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.status === 200) {
            const { id } = await response.json()
            return id
        }
    } catch (e) {
        console.log(e)
    }
}

export default function Timer(props: TimerProps) {
    const { id, user_email, name, date_created, date_of_last_use, frequency } = props.info
    const [uniqueId, setUniqueId] = useState<string>('')

    const [start, setStart] = useState<boolean>(false)
    const [startTime, setStartTime] = useState<number>(0)

    const [timeElapsed, setTimeElapsed] = useState<number>(0)

    const [paused, setPaused] = useState<boolean>(false)
    const [pauseTime, setPauseTime] = useState<number>(0)

    const [bonus, setBonus] = useState<number>(0)

    const intervalIdRef = useRef<number>(0)
    const pauseIntervalIdRef = useRef<number>(0)

    useEffect(() => {
        const timerDateCheck = async () => {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            const unique = await checkForExistingTimer(token, id)
            console.log('uniq', unique)

            if (!unique) {
                setUniqueId(await createDBEntry(token, id))
            } else {
                setUniqueId(unique)
            }
        }
        timerDateCheck()
    }, [])

    // Takes in seconds as a time and outputs a string with hours and minutes
    const formatTime = (time: number): string => {
        // Every skipped 5 or back 5 minutes are calculated here
        const timeWithBonus = time + bonus

        const hours: number = Math.floor(timeWithBonus / 3600);
        const minutes: number = Math.floor((timeWithBonus / 60) % 60);
        const seconds: number = Math.floor(timeWithBonus % 60)

        console.log('seconds.. ', seconds)
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        updateDBTime(token, uniqueId, seconds)

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Start the timer
    const startTimer = async () => {
        if (paused) {
            // Stop the paused timer
            setPaused(false);
            window.clearInterval(pauseIntervalIdRef.current);
        } else if (startTime !== 0) {
            // If the user has pressed start twice without pausing, do nothing
            return
        } else {
            // For the first click, set the time to be counted from
            setStartTime(DateTime.local().toSeconds());
        }

        setStart(true)
    };

    console.log(uniqueId)

    // Have to use useEffect because otherwise startTime doesn't get updated properly on first click
    useEffect(() => {
        if (start) {
            intervalIdRef.current = window.setInterval(() => {
                const newTime = DateTime.local().toSeconds();
                setTimeElapsed(newTime - startTime - pauseTime);
                console.log(typeof(timeElapsed))
            }, 1000)
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [start, pauseTime, startTime])

    // Pause the timer
    const pause = () => {
        setPaused(true)
        setStart(false)

        const now = DateTime.local().toSeconds();

        // Save how many seconds it has been paused for so it can subtract it from the total time
        pauseIntervalIdRef.current = window.setInterval(() => {
            const newTime = DateTime.local().toSeconds();
            setPauseTime(pauseTime + (newTime - now));
        }, 1000)
    };

    // Doesn't work if the timer is paused
    const reset = () => {
        setStartTime(DateTime.local().toSeconds())
    }

    // Skips the timer forward five minutes (through formatTime() function)
    const forwardFive = () => {
        setBonus(bonus + 300)
    }

    // Skips the timer back five minutes
    const backFive = () => {
        setBonus(bonus - 300)
    }


    return (
        <div className={styles.box}>
            <h1>{name}</h1>
            <div>
                {formatTime(timeElapsed)}
            </div>
            <div>
                <button onClick={startTimer}>Start</button>
                <button onClick={pause}>Pause</button>
            </div>
            <div>
                <button onClick={forwardFive}>Skip 5</button>
                <button onClick={backFive}>Back 5</button>
            </div>
            <div>
                <button onClick={reset}>Reset</button>
                <Expand />
            </div>



        </div>
    )
}

/*
            <button onClick={forwardFive}>Skip 5</button>
            <button onClick={backFive}>Back 5</button>
            */