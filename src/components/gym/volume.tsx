import { useState } from "react"
import styles from "../../styles/Workout.module.css"


export default function Volume() {
  const [reps, setReps] = useState(0)
  const [weight, setWeight] = useState(20)
  
  return (
    <div className={styles.container}>

      <div className={styles.exercise}>
        <label htmlFor="exercise">Exercise:</label>
        <select name="exercise">
          <option value="squat">Squat</option>
          <option value="bench-press">Bench Press</option>
          <option value="deadlift">Deadlift</option>
          <option value="overhead-press">Overhead Press</option>
        </select>

      </div>

      <div className={styles.reps}>
        Reps: {reps}
      </div>

      <div className={styles.weight}>
        Weight: {weight}
      </div>

      <button className={styles.button}>Submit</button>
      <div>Last submission:</div>
    </div>
  )
}
