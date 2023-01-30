import image from "../../../public/images/stuff.png"
import Image from "next/image"
import styles from "../../styles/Card.module.css"
import arrow from "../../../public/images/svg/arrow.svg"

export default function Card() {
    return (
        <div className={styles.container}>
            <div>
                <Image
                    className={styles.arrowLeft}
                    src={arrow}
                    alt="arrow"
                    width={34}
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
                    <h2>Track yo'self</h2>
                    <h2>before you </h2>
                    <h2> wreck yo'self</h2>
                </div>
            </div>

            <div >
                <Image
                    className={styles.arrowRight}
                    src={arrow}
                    alt="arrow"
                    width={30}
                    height={30}
                />
            </div>

        </div >
    )
}