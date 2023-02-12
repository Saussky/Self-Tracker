import React, { useState } from 'react'
import styles from '../../styles/general/Box.module.css'
import Expand from './expand'

export default function Counter() {
    const [count, setCount] = useState(0)

    const addOne = () => setCount(count + 1)
    const subtractOne = () => setCount(count - 1)
    const reset = () => setCount(0)

    return (
        <div className={styles.box}>
            <h1>Bottles of Water</h1>
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
