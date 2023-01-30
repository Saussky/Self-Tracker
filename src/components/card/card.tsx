import image from "../../../public/images/stuff.png"
import Image from "next/image"
import styles from "../../styles/Card.module.css"
import arrow from "../../../public/images/svg/arrow.svg"

export default function Card() {
    return (
        <div className={styles.container}>
            <div className={styles.arrowLeft}>
                <Image
                    src={arrow}
                    alt="arrow"
                    width={40}
                    height={30}
                />
            </div>

            <div className={styles.card}>
                <div className={styles.cardImage}>
                    <Image
                        src={image}
                        alt="stuff you can track"
                        width={500}
                        height={500}
                    />
                </div>
                <div className={styles.cardInfo}>
                    <h2>
                        Track yo'self before you wreck yo'self
                    </h2>
                </div>

            </div>

            <div className={styles.arrowRight}>
                    <Image
                        src={arrow}
                        alt="arrow"
                        width={40}
                        height={30}
                    />
                </div>

        </div>
    )
}