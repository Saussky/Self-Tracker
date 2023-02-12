import React, { useState } from 'react'
import styles from '../../styles/general/Expand.module.css'

export default function Expand() {

    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    }

    return (
        <>
            <button onClick={toggleExpand}>+</button>

            <div className={`${styles.expand} ${expanded ? styles.expanded : styles.collapsed}`}>
                <p>Target: </p>
                <p>At this time yesterday: </p>
                <p>Average at this time: </p>
            </div>
        </>
    )
}
