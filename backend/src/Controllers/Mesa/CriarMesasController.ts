import { Request, Response } from 'express'
import { CriarMesaServices } from '../../Services/Mesa/CriarMesasServices'

class CriarMesasController {
    async handle(req: Request, res: Response) {
        const { numero_mesa } = req.body
        const criarMesaServices = new CriarMesaServices()
        const mesa = await criarMesaServices.execute({
            numero_mesa
        })
        return res.json(mesa)
    }
}

export { CriarMesasController }