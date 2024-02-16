import prismaClient from "../../prisma"

interface TokenId {
    id: string
}

class ListarAtendenteTokenServices {
    async execute({ id }: TokenId) {
        const resposta = await prismaClient.atendente.findUnique({
            where: {
                id_atendente: id
            },
            select: {
                id_atendente: true,
                nome: true,
                cpf: true
            }
        })
        return resposta
    }
}

export { ListarAtendenteTokenServices }