import React, { useState } from 'react'

// Need to do one for going up and one for down, will need to use seperate SQL tables?
export default function CreateCounter() {
    const [name, setName] = useState<string>()

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const token: string = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        const response = await fetch('/api/general/counters/counter-info/counter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ name }),
        });

        if (response.status === 200) {
            console.log('YES!')
        } else {
            console.log('fail')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Create A Counter</h1>
            <label htmlFor="name">Name of Counter:</label>
            <input value={name} onChange={handleNameChange}></input>
            <br></br>
            <button type="submit">Create</button>
        </form>
    )
}
