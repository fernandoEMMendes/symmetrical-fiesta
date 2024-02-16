import { Request, Response } from "express"
import { loginUsuarioService } from "../../Services/Usuarios/loginUsuarioService"

export class loginUsuarioController {
    async handle(req: Request, res: Response) {
        const { nome, password } = req.body
        const login = new loginUsuarioService
        const resposta = await login.execute({
            nome, password
        })
        return res.json(resposta)
    }
}