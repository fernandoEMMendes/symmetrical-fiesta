import prismaClient from "../../prisma";

interface apagar {
    produtoId: string
}

export class apagarProdutoService {
    async execute({ produtoId }: apagar) {
        if (!produtoId) {
            throw new Error("Produto não encontrado!")
        }

        await prismaClient.produtos.delete({
            where: {
                id: produtoId
            }
        })
        return {message: "Produto apagado com sucesso!"}
    }
}