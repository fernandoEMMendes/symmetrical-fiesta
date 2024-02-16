import { Request, Response } from 'express'
import { ListarMesaUnicaServices } from '../../Services/Mesa/ListarMesaUnicaServices'

class ListarMesaUnicaController {
    async handle(req: Request, res: Response) {
        const { id_mesa } = req.params
        const listarMesaUnicaServices = new ListarMesaUnicaServices()
        const mesaUnica = await listarMesaUnicaServices.execute({
            id_mesa
        })
        return res.json(mesaUnica)
    }
}

export { ListarMesaUnicaController }