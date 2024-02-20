import { Request, Response } from "express"
import { criarPedidoService } from "../../Services/Pedidos/criarPedidoService"

export class criarPedidoController {
    async handle(req: Request, res: Response) {
        const { item1, item2, item3, item4, item5, atendenteID, mesaID } = req.body
        const criar = new criarPedidoService
        const resposta = await criar.execute({
            item1, item2, item3, item4, item5, mesaID, atendenteID
        })
        return res.json(resposta)
    }
}