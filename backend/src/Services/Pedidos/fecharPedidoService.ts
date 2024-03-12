import prismaClient from "../../prisma";

interface fechar {
    mesaId: string
}

export class fecharPedidoService {
    async execute({ mesaId }: fechar) {
        if (!mesaId) {
            throw new Error("Campos em brancos não são permitidos!")
        }

        await prismaClient.pedidos.deleteMany({
            where: {
                mesaID: mesaId
            }
        })
    }
}