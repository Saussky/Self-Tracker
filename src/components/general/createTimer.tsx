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


    return (
        <form>
            <h1>Create A Timer</h1>
            <label htmlFor="name">Name of Timer:
                <input value={name} onChange={handleNameChange}></input>
            </label>


        </form>
    )
}

/*
            <button onClick={forwardFive}>Skip 5</button>
            <button onClick={backFive}>Back 5</button>
            */