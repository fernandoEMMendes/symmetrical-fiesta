import { Request, Response } from "express"
import { FecharMesaService } from "../../Services/Mesa/FecharMesaService"

export class FecharMesaController {
    async handle(req: Request, res: Response) {
        const { id } = req.body
        const fechar = new FecharMesaService
        const resposta = await fechar.execute({
            id
        })
        return res.json(resposta)
    }
}