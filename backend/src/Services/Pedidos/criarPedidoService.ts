import prismaClient from "../../prisma";

interface criar {
    produtoID: string
    mesaID: string
    quant: number
}

export class criarPedidoService {
    async execute({ produtoID, mesaID, quant }: criar) {
        if (!produtoID || !mesaID || !quant) {
            throw new Error("Campos obrigátorios em branco!")
        }

        const resposta = await prismaClient.pedidos.create({
            data: {
                produtoID: produtoID,
                mesaID: mesaID,
                quant: quant
            }, include: {
                produto: true
            }
        })
        return resposta
    }
}