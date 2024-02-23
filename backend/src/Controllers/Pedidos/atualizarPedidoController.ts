import { Response, Request } from "express";
import { atualizarPedidoService } from "../../Services/Pedidos/atualizarPedidoController";

export class atualizarPedidoController {
    async handle(req: Request, res: Response) {
        const { novoItem1, novoItem2, novoItem3,
            novoItem4, novoItem5, atendenteID,
            mesaID, pedidoId, novoQuant1, novoQuant2, novoQuant3, novoQuant4, novoQuant5 } = req.body
        const atualizar = new atualizarPedidoService()
        const resposta = await atualizar.execute({
            novoItem1, novoItem2, novoItem3, novoItem4, novoItem5,
            atendenteID, mesaID, pedidoId, novoQuant1, novoQuant2, novoQuant3, novoQuant4, novoQuant5
        })
    }
}