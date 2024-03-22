import { Request, Response } from "express"
import { listarProdutoService } from "../../Services/Produtos/listarProdutoService"

export class listarProdutoController {
    async handle(req: Request, res: Response) {
        const listar = new listarProdutoService()
        const resposta = await listar.execute()
        return res.json(resposta)
    }

    async filtrarProdutoController(req: Request, res: Response) {
        const { nome } = req.body
        const listar = new listarProdutoService()
        const resposta = await listar.filtarProdutoServices({
            nome
        })
        return res.json(resposta)
    }
}