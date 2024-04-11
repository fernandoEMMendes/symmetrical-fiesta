import { Request, Response } from "express";
import { criarPedidoService } from "../../Services/Pedidos/criarPedidoService";

export class criarPedidoController {
  async handle(req: Request, res: Response) {
    const { produtoID, mesaID, quant } = req.body;
    // console.log(produtoID, mesaID, quant)
    const criar = new criarPedidoService();
    const resposta = await criar.execute({
      produtoID,
      mesaID,
      quant,
    });
    return res.json(resposta);
  }
}
