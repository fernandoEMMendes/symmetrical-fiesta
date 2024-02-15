import prismaClient from "../../prisma";

interface listarUnico {
    produtoId: string
}

export class listarUnicoProdutoService {
    async execute({ produtoId }: listarUnico) {
        if (!produtoId) {
            throw new Error("Produto não encontrado!")
        }

        const resposta = await prismaClient.produtos.findFirst({
            where: {
                id: produtoId
            },
            select: {
                nome: true,
                descricao: true,
                preco: true,
                banner: true,
            }
        })
        return resposta
    }
}