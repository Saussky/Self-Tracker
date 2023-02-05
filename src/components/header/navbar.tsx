import Link from "next/link"
import styles from "../../styles/Header.module.css"
import { useUser } from '@auth0/nextjs-auth0/client';
import Login from "./login";


export default function Navbar() {
   const { user, isLoading, error } = useUser();
   
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
            <Login />
         </div>
      </div>
   )
}