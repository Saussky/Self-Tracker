import React, { useEffect, useState } from 'react'
import styles from '../../styles/general/General.module.css'
import Counter from './counter/counter'
import CreateCounter from './counter/createCounter'
import CreateTimer from './timer/createTimer'
import Timer from './timer/timer'

export interface GeneralInfo {
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
        const response = await fetch(`/api/general/timers/timer-info/timer`, {
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

async function fetchCounters(token: string) {
    try {
        const response = await fetch(`/api/general/counters/counter-info/counter`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        const { counters } = await response.json()
        console.log(counters)
        return counters;

    } catch (e) {
        console.log('fetch failed')
        console.log(e)
    }
}

export default function GeneralContainer() {
    const [userTimers, setUserTimers] = useState<GeneralInfo[]>([])
    const [userCounters, setUserCounters] = useState<GeneralInfo[]>([])

    useEffect(() => {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        async function fetchAndSetData() {
            const fetchedTimers = await fetchTimers(token)
            const fetchedCounters = await fetchCounters(token)
            setUserTimers(fetchedTimers)
            setUserCounters(fetchedCounters)
            
        }
        fetchAndSetData()
    }, [])

    return (
        <div className={styles.container}>
            {
                userTimers.map(timer => {
                    return <Timer key={timer.id} info={timer} />
                })
            }

            {
                userCounters.map(counter => {
                    return <Counter key={counter.id} info={counter} />
                })
            }

            <CreateTimer />
            <CreateCounter />
        </div>
    )
}