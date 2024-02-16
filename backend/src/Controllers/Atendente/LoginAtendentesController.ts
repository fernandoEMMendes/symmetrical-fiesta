import { Request, Response } from 'express'
import { AutenticarAtendenteServices } from '../../Services/Atendente/LoginAtendentesServices'

class AutenticarAtendenteController {
    async handle(req: Request, res: Response) {
        const { nome, password } = req.body
        const autenticarAtendenteServices = new AutenticarAtendenteServices()
        const autenticar = await autenticarAtendenteServices.execute({
            nome,
            password
        })
        return res.json(autenticar)
    }
}

export { AutenticarAtendenteController }