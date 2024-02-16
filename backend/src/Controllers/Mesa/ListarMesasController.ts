import { Request, Response } from "express"
import { ListarMesaServices } from "../../Services/Mesa/ListarMesasServices"

class ListarMesasController {
    async handle(req: Request, res: Response) {
    const listarMesaServices = new ListarMesaServices()
    const listarMesa = await listarMesaServices.execute()
    return res.json(listarMesa)
    }
}

export { ListarMesasController }