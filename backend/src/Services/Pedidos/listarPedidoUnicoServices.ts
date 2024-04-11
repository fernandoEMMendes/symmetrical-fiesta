import prismaClient from "../../prisma";

interface PedidoUnico{
    id_pedido: string
}

class ListarPedidoUnicoServices{
    async execute({id_pedido}: PedidoUnico) {
        const resposta = await prismaClient.pedidos.findUnique({
            where: {
                id: id_pedido
            },
            select: {
                id: true,
                produtoID: true,
            }
        })
        return resposta
    }
}

export {ListarPedidoUnicoServices}