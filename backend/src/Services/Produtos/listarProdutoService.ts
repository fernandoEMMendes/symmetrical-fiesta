import prismaClient from "../../prisma/"

export class listarProdutoService {
    async execute() {
        const resposta = await prismaClient.produtos.findMany({})
        return resposta
    }
}