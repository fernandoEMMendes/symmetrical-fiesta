import { Request, Response } from "express";
import { ListarPedidoUnicoServices } from "../../Services/Pedidos/listarPedidoUnicoServices";


class ListarPedidoUnicoController{
    async handle(req: Request, res: Response) {
        const {id_pedido} = req.params
        const listarPedidoUnicoServices = new ListarPedidoUnicoServices()
        const PedidoUnico = await listarPedidoUnicoServices.execute({
            id_pedido
        })
        return res.json(PedidoUnico)
    }
    

}

export{ ListarPedidoUnicoController }