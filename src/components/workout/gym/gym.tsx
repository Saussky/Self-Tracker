import { GetServerSideProps } from "next/types";
import React from "react";
import { useState } from "react"
import styles from "../../../styles/workout/Gym.module.css"
import { Category } from "./category";
import { Exercise } from "./exercise";
import { Reps } from "./reps";
import { Weight } from "./weight";

interface Exercise {
  compound_exercise: string;
  push_exercise: string;
  pull_exercise: string;
  legs_exercise: string;
  core_exercise: string;
  other_exercise: string;
}

interface Props {
  exercises: Exercise[];
}

export default function Gym(props: Props) {
  console.log(props)
  const [reps, setReps] = useState(0)
  const [weight, setWeight] = useState(20)
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>('compound');
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

export const getServerSideProps: GetServerSideProps<any> = async ({ req }) => {
  const token = req.headers.cookie?.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, '$1');
  console.log('heiehiehi')
  const res = await fetch(`/api/workout/gym/exercise`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  const data = await res.json();
  console.log(data)
  return { props: { exercises: data.rows } };
};
