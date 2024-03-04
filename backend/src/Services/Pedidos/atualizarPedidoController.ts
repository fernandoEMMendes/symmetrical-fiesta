import prismaClient from "../../prisma";

interface atualizar {
    produtoID: string
    mesaID: string
    pedidoId: string
    quant: string
}

export class atualizarPedidoService {
    async execute({ produtoID, mesaID, pedidoId, quant }: atualizar) {
        if (!produtoID || !pedidoId || !mesaID || !quant) {
            throw new Error("Campos obrigátorios em branco!")
        }

        await prismaClient.pedidos.update({
            where: {
                id: pedidoId
            },
            data: {
                produtoID: produtoID,
                mesaID: mesaID,
                quant: quant
            }
        })
        return { message: "Pedido atualizado com sucesso!" }
    }
}