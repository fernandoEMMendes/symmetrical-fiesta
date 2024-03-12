import prismaClient from "../../prisma";

interface atualizar {

    pedidoId: string
    quant: string
}

export class atualizarPedidoService {
    async execute({ pedidoId, quant }: atualizar) {
        if (!pedidoId || !quant) {
            throw new Error("Campos obrigátorios em branco!")
        }

        await prismaClient.pedidos.update({
            where: {
                id: pedidoId
            },
            data: {
                quant: quant
            }
        })
        return { message: "Pedido atualizado com sucesso!" }
    }
}