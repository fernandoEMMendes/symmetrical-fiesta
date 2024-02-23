import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import apiLocal from "../../APIs/apiLocal"

export default function Caixa() {

    const navigation = useNavigate()

    const lsToken = localStorage.getItem("@PJI2024")
    const token = JSON.parse(lsToken)

    useEffect(() => {

        async function verificarLSToken() {
            const resposta = await apiLocal.get("/ListarUnicoUsuario")

            if (resposta.data.dados) {
                navigation("/")
                return
            } else if (resposta.data.id) {
                navigation("/Caixa")
            }
        }
        verificarLSToken()
    }, [token])

    return (
        <div>
            <h1>Caixa</h1>
        </div>
    )
}