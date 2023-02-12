import React from 'react'
import styles from "../../../styles/workout/Gym.module.css"

interface RepsProps {
    reps: number
    setReps: React.Dispatch<React.SetStateAction<number>>;
}

export function Reps(props: RepsProps) {
    const { reps, setReps } = props

    return (
        <div className={styles.reps}>
        <div className={styles.heading}>Reps:</div>
        <div className={styles.repDisplay}>
          <button className={styles.buttonChange} onClick={() => setReps(reps - 5)}>-5</button>
          <button className={styles.buttonChange} onClick={() => setReps(reps - 1)}>-1</button>
          {reps}
          <button className={styles.buttonChange} onClick={() => setReps(reps + 1)}>+1</button>
          <button className={styles.buttonChange} onClick={() => setReps(reps + 5)}>+5</button>
        </div>
      </div>
    )
}