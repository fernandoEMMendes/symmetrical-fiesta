import { Request, Response } from "express"
import { lsitarUnicoUsuarioService } from "../../Services/Usuarios/listarUnicoUsuarioService"

export class listarUnicoUsuarioController {
    async handle(req: Request, res: Response) {
        const { id } = req.body
        const listarUnico = new lsitarUnicoUsuarioService()
        const resposta = await listarUnico.execute({
            id
        })
        return res.json(resposta)
    }
}