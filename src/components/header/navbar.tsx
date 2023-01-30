import Link from "next/link"
import styles from "../../styles/Header.module.css"


export default function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.navOptions}>
                <Link href="/">Home</Link>
             </div>
             <div className={styles.navOptions}>
                <Link href="/general">General</Link>
             </div>
             <div className={styles.navOptions}>
                <Link href="/gym">Workout</Link>
             </div>
             <div className={styles.navOptions}>
                <Link href="/gym">Spending</Link>
             </div>
             <div className={styles.navOptions}>
                <Link href="/gym">Login</Link>
             </div>
        </div>
    )
}