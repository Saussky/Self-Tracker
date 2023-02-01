import React, { useEffect, useRef, useState } from 'react'
import { DateTime } from 'luxon'
import styles from '../../styles/Box.module.css'
import Expand from './expand'

export default function Timer() {
    const [start, setStart] = useState(false)
    const [startTime, setStartTime] = useState(0)

    const [timeElapsed, setTimeElapsed] = useState(0)

    const [paused, setPaused] = useState(false)
    const [pauseTime, setPauseTime] = useState(0)

    const [bonus, setBonus] = useState(0)

    const intervalIdRef = useRef(0);
    const pauseIntervalIdRef = useRef(0)

    // Takes in seconds as a time and outputs a string with hours and minutes
    const formatTime = (time: number): string => {
        // Every skipped 5 or back 5 minutes are calculated here
        const timeWithBonus = time + bonus

        const hours: number = Math.floor(timeWithBonus / 3600);
        const minutes: number = Math.floor((timeWithBonus / 60) % 60);
        const seconds: number = Math.floor(timeWithBonus % 60)

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // Start the timer
    const startTimer = () => {
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
            <h1>Work Timer</h1>
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