import { Request, Response } from "express"
import { criarPedidoService } from "../../Services/Pedidos/criarPedidoService"

export class criarPedidoController {
    async handle(req: Request, res: Response) {
        const { item1, quant1, item2, quant2, item3, quant3,
            item4, quant4, item5, quant5, atendenteID, mesaID } = req.body
        const criar = new criarPedidoService
        const resposta = await criar.execute({
            item1,
            item2,
            item3,
            item4,
            item5,
            mesaID,
            atendenteID,
            quant1,
            quant2,
            quant3,
            quant4,
            quant5
        })
        return res.json(resposta)
    }
}