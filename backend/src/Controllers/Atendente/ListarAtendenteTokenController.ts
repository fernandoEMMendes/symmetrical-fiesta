import { Request, Response } from 'express'
import { ListarAtendenteTokenServices } from '../../Services/Atendente/ListarAtendenteTokenServices'

class ListarAtendenteTokenController {
  async handle(req: Request, res: Response) {
    const id = req.user_id
    const listarAtendenteTokenServices = new ListarAtendenteTokenServices()
    const resposta = await listarAtendenteTokenServices.execute({
      id
    })
    return res.json(resposta)
  }
}

export { ListarAtendenteTokenController }