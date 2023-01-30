import React from 'react'
import Image from "next/image";
import banner from "../../../public/images/banner2.png"
import styles from "../../styles/Header.module.css"

export default function Banner() {

    return (
        <div className={styles.banner}>
            <Image
                src={banner}
                alt="banner"
                fill
                quality={100}
            />

        </div>
    )
}

