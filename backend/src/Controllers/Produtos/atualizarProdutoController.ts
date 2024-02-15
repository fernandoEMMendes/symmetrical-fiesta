import { Request, Response } from "express";
import { atualizarProdutoService } from "../../Services/Produtos/atualizarProdutoService";

export class atualizarProdutoController {
    async handle(req: Request, res: Response) {
        const { produtoId, novoNome, novoDescricao, novoBanner, novoPreco } = req.body

        const atualizar = new atualizarProdutoService()
        const resposta = atualizar.execute({
            produtoId, novoNome, novoDescricao, novoBanner, novoPreco
        })
        return res.json(resposta)
    }
}