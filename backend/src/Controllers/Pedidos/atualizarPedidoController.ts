import { Response, Request } from "express";
import { atualizarPedidoService } from "../../Services/Pedidos/atualizarPedidoController";

export class atualizarPedidoController {
    async handle(req: Request, res: Response) {
        const { pedidoId, quant } = req.body
        const atualizar = new atualizarPedidoService()
        const resposta = await atualizar.execute({
            pedidoId, quant
        })
    }
}