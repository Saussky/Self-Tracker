import React from 'react'
import Banner from './banner'
import Navbar from './navbar'
import styles from "../../styles/Header.module.css"

export default function Header() {

    return (
        <div className={styles.header}>
            <Banner />
            <Navbar />
        </div>
    )
}

        