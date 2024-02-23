import apiLocal from "../../APIs/apiLocal"
import {useNavigate} from "react-router-dom"
import {useState, useEffect} from "react"

export default function Home() {
    const navigation = useNavigate()
    const [nome, setNome] = useState("")
    const [password, setPassword] = useState("");

    
    
    return (
        <h1>Caixa - Login</h1>
    )
}