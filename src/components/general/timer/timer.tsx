import React, { useEffect, useRef, useState } from 'react'
import { DateTime } from 'luxon'
import styles from '../../../styles/general/Box.module.css'
import Expand from '../expand'
import { GeneralInfo } from '../general'

interface TimerProps {
    key: string,
    info: GeneralInfo
}

// TODO: Add toaster error messages, seperate fetch functions into server side props (use context as input for token)
// TODO: Add a hide button to this and counter box

async function createDBEntry(token: string, id: string) {
    try {
        const response = await fetch('/api/general/timers/timer-data/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ id }),
        })

        if (response.status === 200) {
            const data = await response.json();
            return data.UUID
        }
    } catch (e) {
        console.log(e)
    }
}

async function updateDBTime(token: string, uniqueId: string, timeElapsed: string) {
    try {
        const response = await fetch('/api/general/timers/timer-data/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ uniqueId, timeElapsed }),
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
        const response = await fetch(`/api/general/timers/timer-data/check?info_id=${info_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (response.status === 200) {
            const { id, time_elapsed } = await response.json()
            return { id, time_elapsed }
        }
    } catch (e) {
        console.log(e)
        return {id: false, time_elapsed: 0}
    }
}

async function deleteTimer(token: string, infoId: string) {
    try {
        const response = await fetch('/api/general/timers/timer-info/timer', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ infoId }),
        })

        if (response.status === 200) {
            console.log("TIME DELETED!")
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
    const [previousSeconds, setPreviousSeconds] = useState<number>(0)

    const intervalIdRef = useRef<number>(0)
    const pauseIntervalIdRef = useRef<number>(0)

    useEffect(() => {
        const timerDateCheck = async () => {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            const unique = await checkForExistingTimer(token, id)

            if (!unique || !unique.id) {
                setUniqueId(await createDBEntry(token, id))
            } else {
                setUniqueId(unique.id)
                setPreviousSeconds(seconds => seconds + unique.time_elapsed)
            }
        }
        timerDateCheck()
    }, [id])

    // Takes in seconds as a time and outputs a string with hours and minutes
    const formatTime = (time: number): string => {
        // Every skipped 5 or back 5 minutes are calculated here
        const timeWithBonus: number = time + bonus + previousSeconds

        const hours: number = Math.floor(timeWithBonus / 3600);
        const minutes: number = Math.floor((timeWithBonus / 60) % 60);
        const seconds: number = Math.floor(timeWithBonus % 60);       
        const totalTime: string = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

        const token: string = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        // Update the DB only if seconds is at 15, 30, 45 or 60
        seconds % 15 === 0 && updateDBTime(token, uniqueId, totalTime)

        return totalTime;
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

    // Have to use useEffect because otherwise startTime doesn't get updated properly on first click
    useEffect(() => {
        if (start) {
            intervalIdRef.current = window.setInterval(() => {
                const newTime = DateTime.local().toSeconds();
                setTimeElapsed(newTime - startTime - pauseTime);
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
        setPreviousSeconds(0)
        setBonus(0)
        setPauseTime(0)
        setTimeElapsed(0)

        setStartTime(DateTime.local().toSeconds())
        setStart(true)
    }

    // Skips the timer forward five minutes (through formatTime() function)
    const forwardFive = () => {
        setBonus(bonus + 300)
    }

    // Skips the timer back five minutes
    const backFive = () => {
        setBonus(bonus - 300)
    }

    const deleteThisTimer = () => {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        deleteTimer(token, id)
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
                <button onClick={deleteThisTimer}>Delete</button>
            </div>
        </div>
    )
}
