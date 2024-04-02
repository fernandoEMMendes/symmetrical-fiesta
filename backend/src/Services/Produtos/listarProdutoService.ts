import prismaClient from "../../prisma/"

interface filtarProduto {
    nome: string
}

export class listarProdutoService {
    async execute() {
        const resposta = await prismaClient.produtos.findMany({})
        return resposta
    }

    async filtarProdutoServices({ nome }: filtarProduto) {
        const resposta = await prismaClient.produtos.findMany({
            where: {
                nome: nome
            },
            orderBy: {
                nome: "asc"
            }
        })
        return resposta
    }
}