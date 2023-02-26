import Link from "next/link"
import { useEffect, useState } from "react";
import styles from "../../styles/Header.module.css"
import Login from "./login";



export default function Navbar() {
   const [loggedIn, setLoggedIn] = useState<boolean>()

   // If the JWT in the cookies is valid, set the loggedIn state to true
   useEffect(() => {
      const token: string = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      async function checkUserLoggedIn() {
         try {
            const response = await fetch('/api/auth/check', {
               method: "POST",
               headers: {
                  "Content-Type": 'application/json',
                  "Authorization": `Bearer ${token}`
               }
            })

            if (response.status === 200) {
               setLoggedIn(true)
            } return false
         } catch (e) {
            console.log(e)
            return false
         }
      }
      checkUserLoggedIn()

   }, [])

   const logout = () => {
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      location.reload()
   };


   return (
      <div className={styles.navbar}>
         <div className={styles.navOptions}>
            <Link href="/">Home</Link>
         </div>
         <div className={styles.navOptions}>
            <Link href="/general">General</Link>
         </div>
         <div className={styles.navOptions}>
            <Link href="/workout">Workout</Link>
         </div>

         <div className={styles.navOptions}>
            <Link href="/gym">Spending</Link>
         </div>

         <div className={styles.navOptions}>
            {!loggedIn ? (
               <Link href="/login">Login</Link>
            ) : (
               <div onClick={logout}style={{ cursor: 'pointer' }}>Logout</div>
            )}
         </div>


         {/* <div className={styles.navOptions}>
            <Login />
         </div> */}
      </div>
   )
}