import React, { useEffect, useState } from 'react'
import styles from '../../../styles/general/Box.module.css'
import Expand from '../expand'
import { GeneralInfo } from '../general'

interface CounterProps {
    key: string,
    info: GeneralInfo
}


async function createDBEntry(token: string, id: string) {
    try {
        const response = await fetch('/api/general/counters/counter-data/start', {
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

async function updateDBCount(token: string, uniqueId: string, amount: number) {
    try {
        const response = await fetch('/api/general/counters/counter-data/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ uniqueId, amount }),
        })

        if (response.status === 200) {
            console.log("COUNT UPDATED!")
        }
    } catch (e) {
        console.log(e)
    }
}

async function checkForExistingCounter(token: string, info_id: string) {
    try {
        const response = await fetch(`/api/general/counters/counter-data/check?info_id=${info_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })

        if (response.status === 200) {
            const { id, amount } = await response.json()
            return { id, amount }
        }
    } catch (e) {
        console.log(e)
        return {id: false, amount: 0}
    }
}

export default function Counter(props: CounterProps) {
    const { id, user_email, name, date_created, date_of_last_use, frequency } = props.info
    const [uniqueId, setUniqueId] = useState<string>('')
    const [count, setCount] = useState<number>(0)

    useEffect(() => {
        const counterDateCheck = async () => {
            const token = (document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
            const existing = await checkForExistingCounter(token, id)

            if (!existing || !existing.id) {
                setUniqueId(await createDBEntry(token, id))
            } else {
                setUniqueId(existing.id)
                setCount(existing.amount)
            }
        }
        counterDateCheck()
    }, [id])

    // When the count is updated, send the info to the backend
    useEffect(() => {
        const token = (document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1"))
        updateDBCount(token, uniqueId, count)
    }, [count, uniqueId])

    const addOne = () => setCount(count + 1)
    const subtractOne = () => setCount(count - 1)
    const reset = () => setCount(0)

    return (
        <div className={styles.box}>
            <h1>{name}</h1>
            <div>{count}</div>
            <div>
                <div>
                    <button onClick={addOne}>+1</button>
                    <button onClick={subtractOne}>-1</button>
                </div>
                <div>
                    <button onClick={reset}>Reset</button>
                    <Expand />
                </div>
            </div>
        </div>
    )
}
