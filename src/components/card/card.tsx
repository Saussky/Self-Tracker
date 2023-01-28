import image from "../../../public/images/stuff.png"
import Image from "next/image"
import styles from "../../styles/Card.module.css"

export default function Card() {
    return (
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
    )
}