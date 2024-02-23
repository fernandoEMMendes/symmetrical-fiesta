import { createContext } from "react"
import { toast } from "react-toastify"
import apiLocal from "../APIs/apiLocal"

export const AuthContext = createContext()

export default function AuthProvider({ children }) {

    async function signIn({ nome, password }) {
        try {
            const resposta = await apiLocal.post("/LoginUsuario", {
                nome, password
            })
            return resposta
        } catch (err) {
            toast.warning("Erro no Login!")
            return
        }
    }

    return (
        <AuthProvider.Provider value={{ signIn }}>
            {children}
        </AuthProvider.Provider>
    )
}
