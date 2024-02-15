import { Request, Response } from "express"
import { listarUnicoProdutoService } from "../../Services/Produtos/listarUnicoProdutoService"

export class listarUnicoProdutoController {
    async handle(req: Request, res: Response) {
        const { produtoId } = req.body
        const listarUnico = new listarUnicoProdutoService
        const resposta = await listarUnico.execute({
            produtoId
        })
        return res.json(resposta)
    }
}