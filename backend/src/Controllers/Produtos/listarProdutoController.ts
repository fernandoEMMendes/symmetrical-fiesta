import { Request, Response } from "express"
import { listarProdutoService } from "../../Services/Produtos/listarProdutoService"

export class listarProdutoController {
    async handle(req: Request, res: Response) {

        const listar = new listarProdutoService()
        const resposta = await listar.execute()
        return res.json(resposta)
    }
}