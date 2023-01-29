import image from "../../../public/images/stuff.png"
import Image from "next/image"
import styles from "../../styles/Card.module.css"
import arrow from "../../../public/images/svg/arrow.svg"

export default function Card() {
    return (
        <>
            <Image
                src={arrow}
                alt="arrow"
                width={200}
                height={60}
            />

            <div className={styles.card}>
                <div className={styles.image}>
                    <Image
                        src={image}
                        alt="stuff you can track"
                        width={500}
                        height={500}
                    />
                </div>
                <div className={styles.info}>
                    <h2>
                        Track yo'self before you wreck yo'self
                    </h2>
                </div>
            </div>

        </>
    )
}