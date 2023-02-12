import { useState } from "react";
import styles from "../../styles/workout/Selection.module.css"
import Gym from "./gym/gym"

export default function Selection() {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    if (selectedOption === "Gym") {
        return (<Gym />)
    }
    // else if (selectedOption === "Plyometrics") {
    //     return
    // } else if (selectedOption === "Pilates") {
    //     return
    // }

    
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <h2>Choose an option:</h2>
            </div>

            <div className={styles.buttons}>
                <div className={styles.choice} onClick={() => setSelectedOption("Gym")}>
                    Gym
                </div>
                <div className={styles.choice}>Plyometrics</div>
                <div className={styles.choice}>Pilates</div>
            </div>

            <div className={styles.addChoice}>
                <div className={styles.choice}>
                    + Add an option
                </div>
            </div>
        </div>
    )
}