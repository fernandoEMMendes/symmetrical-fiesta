import { Request, Response } from "express"
import { listarPedidoService } from "../../Services/Pedidos/listarPedidoService"

export class listarPedidoController {
    async handle(req: Response, res: Response) {
        const listar = new listarPedidoService()
        const resposta = await listar.execute()
        return res.json(resposta)
    }
}