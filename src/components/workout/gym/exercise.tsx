import React, { useEffect, useState } from "react";
import styles from "../../../styles/workout/Gym.module.css"

interface ExerciseProps {
    selectedCategory: string | undefined;
    exercise: string | undefined;
    setExercise: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const sampleExercise: string[] = [
    'squat', 'bench press', 'deadlift', 'overhead press'
]

export function Exercise(props: ExerciseProps) {
    const { selectedCategory, exercise, setExercise } = props
    const [exerciseOptions, setExerciseOptions] = useState<string[]>(sampleExercise)

    function capitaliseWords(str: string) {
        return str.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
    }

    useEffect(() => {
        switch (selectedCategory) {
            case ('compound'):
                //make API call
                break
            case ('push'):
                break
            case ('pull'):
                break
            case ('leg'):
                break
            case ('core'):
                break
        }
    }, [])

    return (
        <div className={styles.exercise}>
            <label htmlFor="exercise" className={styles.heading}>
                Exercise:
            </label>

            <select name="exercise"
                className={styles.exerciseSelect}
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
            >

                {exerciseOptions.map((movement) => (
                    <React.Fragment key={movement}>
                        <option value={capitaliseWords(movement)}>
                            {capitaliseWords(movement)}
                        </option>
                    </React.Fragment>
                ))}

            </select>

        </div>
    )
}

/*



                <option value="squat">Squat</option>
                <option value="bench-press">Bench Press</option>
                <option value="deadlift">Deadlift</option>
                <option value="overhead-press">Overhead Press</option>
                */