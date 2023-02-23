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

export default function GeneralContainer() {
    const [userTimers, setUserTimers] = useState<TimerInfo[]>([])

    async function fetchTimers() {
        try {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

            const response = await fetch(`/api/general/timers/timer-info/get?token=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const { timers } = await response.json()
           
            return setUserTimers(timers);

        } catch (e) {
            console.log('fetch failed')
            console.log(e)
        }
    }

    useEffect(() => {
        fetchTimers()
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