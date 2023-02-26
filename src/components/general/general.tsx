import React, { useEffect, useState } from 'react'
import styles from '../../styles/general/General.module.css'
import Counter from './counter'
import CreateTimer from './createTimer'
import Timer from './timer'

export interface TimerInfo {
    id: string,
    user_email: string,
    name: string,
    date_created: string,
    date_of_last_use: string,
    frequency: number
}

// Need to check if there is already a timer setup for the day

async function fetchTimers(token: string) {
    try {
        const response = await fetch(`/api/general/timers/timer-info/get`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        const { timers } = await response.json()
        return timers;

    } catch (e) {
        console.log('fetch failed')
        console.log(e)
    }
}

export default function GeneralContainer() {
    const [userTimers, setUserTimers] = useState<TimerInfo[]>([])

    useEffect(() => {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        async function fetchAndSetTimers() {
            const fetchedTimers = await fetchTimers(token);
            setUserTimers(fetchedTimers);
        }
        fetchAndSetTimers();
    }, [])

    return (
        <div className={styles.container}>
            {
                userTimers.map(timer => {
                    return <Timer key={timer.id} info={timer} />
                })
            }
            {//<Timer />
            }
            <Counter />
            <CreateTimer />
        </div>
    )
}