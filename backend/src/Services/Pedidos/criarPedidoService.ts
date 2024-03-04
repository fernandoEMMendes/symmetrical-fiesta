import prismaClient from "../../prisma";

interface criar {
    produtoID: string
    mesaID: string
    quant: string
}

export class criarPedidoService {
    async execute({ produtoID, mesaID, quant }: criar) {
        if (!produtoID || !mesaID || !quant) {
            throw new Error("Campos obrigátorios em branco!")
        }

        await prismaClient.pedidos.create({
            data: {
                produtoID: produtoID,
                mesaID: mesaID,
                quant: quant
            }
        })
        return { message: "Pedido criado com sucesso!" }
    }
}