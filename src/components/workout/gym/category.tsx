import React from "react";
import styles from "../../../styles/workout/Gym.module.css"


interface CategoryProps {
    selectedCategory: string | undefined;
    setSelectedCategory: React.Dispatch<React.SetStateAction<string | undefined>>;
}
  
const categoryOptions = [
    { id: 'compound', label: 'Compound' },
    { id: 'push', label: 'Push' },
    { id: 'pull', label: 'Pull' },
    { id: 'legs', label: 'Legs' },
    { id: 'core', label: 'Core' },
];


export function Category(props: CategoryProps) {
    const { selectedCategory, setSelectedCategory } = props;

    return (
        <div className={styles.category}>
        <label htmlFor="category" className={styles.heading}>
          Category:
        </label>
        <div className={styles.radioGroup}>

          {categoryOptions.map(({ id, label }) => (
            <React.Fragment key={id}>
              <input
                type="radio"
                id={id}
                name="category"
                value={id}
                checked={selectedCategory === id}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />

              <label htmlFor={id} className={styles.radioOptions}>{label}</label>
            </React.Fragment>
          ))}

        </div>
      </div>
    )
}