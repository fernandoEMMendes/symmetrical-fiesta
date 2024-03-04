import { Response, Request } from "express";
import { atualizarPedidoService } from "../../Services/Pedidos/atualizarPedidoController";

export class atualizarPedidoController {
    async handle(req: Request, res: Response) {
        const { mesaID, pedidoId, produtoID, quant } = req.body
        const atualizar = new atualizarPedidoService()
        const resposta = await atualizar.execute({
            mesaID, pedidoId, produtoID, quant
        })
    }
}