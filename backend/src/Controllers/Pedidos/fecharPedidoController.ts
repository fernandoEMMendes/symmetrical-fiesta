import { Request, Response } from "express";
import { fecharPedidoService } from "../../Services/Pedidos/fecharPedidoService";

export class fecharPedidoController {
    async handle(req: Request, res: Response) {
        const { mesaId } = req.body
        const fechar = new fecharPedidoService()
        const resposta = fechar.execute({
            mesaId
        })
        return res.json(resposta)
    }
}