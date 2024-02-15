import { Request, Response } from "express"
import { criarProdutoService } from "../../Services/Produtos/criarProdutoService"

export class criarProdutoController {
    async handle(req: Request, res: Response) {
        const { nome, descricao, preco } = req.body

        if (!req.file) {
            throw new Error("Problema na imagem")
        } else {
            const { originalname, filename: banner } = req.file

            const criar = new criarProdutoService
            const resposta = await criar.execute({
                nome, descricao, banner, preco
            })
            return res.json(resposta)
        }
    }
}