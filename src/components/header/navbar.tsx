import Link from "next/link"
import { useEffect, useState } from "react";
import styles from "../../styles/Header.module.css"


export default function Navbar() {
   const [loggedIn, setLoggedIn] = useState<boolean>()

   // If the JWT in the cookies is valid, set the loggedIn state to true
   useEffect(() => {
      const token: string = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1")
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
            } else {
               setLoggedIn(false)
            }
         } catch (e) {
            console.log(e)
            setLoggedIn(false)
         }
      }
      checkUserLoggedIn()
   }, [])

   const logout = () => {
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      window.location.href = '/'
   }

   // If the user is not logged in, it will take them to the login page, otherwise it will load the path given in the argument
   const path = (name: string) => {
      return loggedIn ? `/${name.toLowerCase()}` : "/login"
   }

   return (
      <div className={styles.navbar}>
         <div className={styles.navOptions}>
            <Link href="/">Home</Link>
         </div>

         <div className={styles.navOptions}>
            <Link href={path("general")}>General</Link>
         </div>

         <div className={styles.navOptions}>
            <Link href={path("workout")}>Workout</Link>
         </div>

         <div className={styles.navOptions}>
            <Link href={path("spending")}>Spending</Link>
         </div>

         <div className={styles.navOptions}>
            {!loggedIn ? (
               <Link href="/login">Login</Link>
            ) : (
               <div onClick={logout} style={{ cursor: 'pointer' }}>Logout</div>
            )}
         </div>
      </div>
   )
}