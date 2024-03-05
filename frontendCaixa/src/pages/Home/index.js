import apiLocal from "../../APIs/apiLocal"
import { useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../Context"
import { toast } from "react-toastify"

export default function Home() {
    const navigation = useNavigate()
    const [nome, setNome] = useState("")
    const [password, setPassword] = useState("");

    const { signIn } = useContext(AuthContext)

    

    useEffect(() => {
        const lsToken = localStorage.getItem("@PJI2024")
        const token = JSON.parse(lsToken)
        if(!token){
            navigation('/')
        }else if (token){
        async function verificarLSToken() {
            const resposta = await apiLocal.get("/ListarUnicoUsuario",{
                headers:{
                    Authorization: 'Bearer ' + `${token}`
                }
            })
            if (resposta.data.dados) {
                navigation("/")
                return
            }else if (resposta.data.id){
                navigation('/Dashboard')
                return
            }
        }verificarLSToken()
    }}, [])


    async function handleLogin(e) {
        e.preventDefault(e)

        if (!nome || !password) {
            toast.warning("Campos obrigatorios não preenchidos!")
            return
        }

        try {
            let data = {
                nome, password
            }
            const resposta = await signIn(data)
            const token = resposta.data.token
            localStorage.setItem("@PJI2024", JSON.stringify(token))

            toast.success("Login efetuado com sucesso!")
            navigation("/Dashboard")
            return

        } catch (err) {
            toast.error("Nome ou Senha incorretas!")
            return
        }
    }

    return (
        <div>
            <div>
                <h1>Caixa - Login</h1>
            </div>

            <div>
                <form onSubmit={handleLogin}>
                    <label>Nome🎭</label>
                    <input placeholder="Escreva o nome aqui!" 
                    value={nome} 
                    onChange={(e) =>setNome(e.target.value) } />

                    <label>Senha🔑</label>
                    <input 
                    placeholder="Escreva a senha aqui!" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} />

                    <button type="submit">Logar</button>
                </form>
            </div>

        </div>
    )
}