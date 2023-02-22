import React from 'react'
import styles from '../../styles/general/General.module.css'
import Counter from './counter'
import CreateTimer from './createTimer'
import Timer from './timer'

export default function GeneralContainer() {
    return (
        <div className={styles.container}>
            <Timer />
            <Counter />
            <CreateTimer />
        </div>
    )
}