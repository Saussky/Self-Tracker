import React, { useEffect, useState } from "react";
import styles from "../../../styles/workout/Gym.module.css"

//TODO: Check if adding new exercise is a duplicate?
interface ExerciseProps {
    selectedCategory: string | undefined;
    exercise: string | undefined;
    setExercise: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function capitaliseWords(str: string) {
    return str.split(' ').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ');
}

const sampleExercise: string[] = [
    'squat', 'bench press', 'deadlift', 'overhead press'
]

export function Exercise(props: ExerciseProps) {
    const { selectedCategory, exercise, setExercise } = props
    const [exerciseOptions, setExerciseOptions] = useState<string[]>(sampleExercise)

    async function addExercise() {
        const newExercise = window.prompt('Enter an exercise name:');

        if (newExercise) {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

            const response = await fetch('/api/workout/gym/exercise', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    category: selectedCategory,
                    exercise: newExercise
                })
            });
            if (response.ok) {
                console.log('bazinga')
                setExercise(newExercise);
            } else {
                console.error('Error adding exercise:', response.status);
            }
        }

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

            <button onClick={addExercise}>Add</button>

        </div>
    )
}
