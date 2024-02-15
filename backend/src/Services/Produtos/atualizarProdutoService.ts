import prismaClient from "../../prisma";

interface atualizar {
    produtoId: string
    novoNome: string
    novoDescricao: string
    novoBanner: string
    novoPreco: string
}

export class atualizarProdutoService {
    async execute({ produtoId, novoNome, novoDescricao, novoBanner, novoPreco }: atualizar) {
        if (!novoNome || !novoDescricao || !novoBanner || !novoPreco) {
            throw new Error("Campos em brancos não são permitidos!")
        }
        const verificarId = await prismaClient.produtos.findFirst({
            where: {
                id: produtoId
            }
        })
        if (!verificarId) {
            throw new Error("Produto não encontrado!")
        }

        await prismaClient.produtos.update({
            where: {
                id: produtoId
            },
            data: {
                nome: novoNome,
                descricao: novoDescricao,
                banner: novoBanner,
                preco: novoPreco
            }
        })
        return { message: "Produto atualizado com sucesso!" }
    }
}