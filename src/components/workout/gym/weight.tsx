import React from 'react'
import styles from "../../../styles/workout/Gym.module.css"

interface WeightProps {
    weight: number
    setWeight: React.Dispatch<React.SetStateAction<number>>;
}

export function Weight(props: WeightProps) {
    const { weight, setWeight } = props
    
    return (
        <div className={styles.weight}>
            <div className={styles.heading}>Weight:</div>
            <div className={styles.weightDisplay}>
                <button className={styles.buttonChange} onClick={() => setWeight(weight - 10)}>-10</button>
                <button className={styles.buttonChange} onClick={() => setWeight(weight - 1.25)}>-1.25</button>
                {weight}
                <button className={styles.buttonChange} onClick={() => setWeight(weight + 1.25)}>+1.25</button>
                <button className={styles.buttonChange} onClick={() => setWeight(weight + 10)}>+10</button>

            </div>
        </div>
    )
}