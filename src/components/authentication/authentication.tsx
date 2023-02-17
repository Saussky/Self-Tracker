import { useState } from "react"
import LoginForm from "./login"
import SignUp from "./signup"

export default function Authentication() {
    const [method, setMethod] = useState<string>('login')
    
    return method == 'login' ? <LoginForm method={method} setMethod={setMethod}/> : <SignUp method={method} setMethod={setMethod}/>
    
}