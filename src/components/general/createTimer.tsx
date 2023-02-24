import React, { useEffect, useRef, useState } from 'react'
import { DateTime } from 'luxon'
import styles from '../../styles/general/Box.module.css'
import Expand from './expand'

// Need to do one for going up and one for down, will need to use seperate SQL tables?
export default function CreateTimer() {
    const [name, setName] = useState<string>()

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        const response = await fetch('/api/general/timers/timer-info/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, token}),
        });

        if (response.status === 200) {
            console.log('YES!')
        } else {
            console.log('fail')
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <h1>Create A Timer</h1>
            <label htmlFor="name">Name of Timer:</label>
            <input value={name} onChange={handleNameChange}></input>
            <br></br>
            <button type="submit">Create</button>

        </form>
    )
}

/*
            <button onClick={forwardFive}>Skip 5</button>
            <button onClick={backFive}>Back 5</button>
            */