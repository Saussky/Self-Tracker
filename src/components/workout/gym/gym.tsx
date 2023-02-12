import React from "react";
import { useState } from "react"
import styles from "../../../styles/workout/Gym.module.css"
import { Category } from "./category";
import { Exercise } from "./exercise";
import { Reps } from "./reps";
import { Weight } from "./weight";


export default function Gym() {
  const [reps, setReps] = useState(0)
  const [weight, setWeight] = useState(20)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);
  const [exercise, setExercise] = useState<string | undefined>(undefined)

  return (
    <div className={styles.container}>

      <Category
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Exercise
        selectedCategory={selectedCategory}
        exercise={exercise}
        setExercise={setExercise}
      />

      <Reps
        reps={reps}
        setReps={setReps}
      />

      <Weight
        weight={weight}
        setWeight={setWeight}
      />

      <div className={styles.submission}>
        <button className={styles.buttonSubmit}>Submit</button>
        <div className={styles.previousSubmission}>Last submission:</div>
      </div>

    </div>
  )
}
