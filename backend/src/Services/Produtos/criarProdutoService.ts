import prismaClient from "../../prisma";

interface Criar {
    nome: string
    descricao: string
    banner: string
    preco: string
}

export class criarProdutoService {
    async execute({ nome, descricao, banner, preco }: Criar) {

        if (!nome || !descricao || !banner || !preco) {
            throw new Error("Campos em brancos não são permitidos!")
        }

        await prismaClient.produtos.create({
            data: {
                nome: nome,
                descricao: descricao,
                banner: banner,
                preco: preco
            },
            select: {
                id: true,
                nome: true
            }
        })
        return { message: "Produto criado com sucesso!" }
    }
}