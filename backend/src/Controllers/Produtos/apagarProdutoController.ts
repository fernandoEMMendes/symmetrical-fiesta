import { Request, Response } from "express"
import { apagarProdutoService } from "../../Services/Produtos/apagarProdutoService"

export class apagarProdutoController {
    async handle(req: Request, res: Response) {
        const { produtoId } = req.body
        const apagar = new apagarProdutoService
        const resposta = await apagar.execute({
            produtoId
        })
        return res.json(resposta)
    }
}