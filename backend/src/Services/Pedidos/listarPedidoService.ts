import prismaClient from "../../prisma";

export class listarPedidoService {
    async execute() {
        const resposta = await prismaClient.pedidos.findMany({})
        return resposta
    }
}