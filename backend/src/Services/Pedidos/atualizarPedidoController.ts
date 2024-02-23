import prismaClient from "../../prisma";

interface atualizar {
    novoItem1: string
    novoItem2: string
    novoItem3: string
    novoItem4: string
    novoItem5: string
    novoQuant1: string
    novoQuant2: string
    novoQuant3: string
    novoQuant4: string
    novoQuant5: string
    atendenteID: string
    mesaID: string
    pedidoId: string
}

export class atualizarPedidoService {
    async execute({ novoItem1, novoItem2, novoItem3, novoItem4, novoItem5, atendenteID, mesaID, pedidoId, novoQuant1, novoQuant2, novoQuant3, novoQuant4, novoQuant5 }: atualizar) {
        if (!novoItem1 || !novoQuant1 || !mesaID || !atendenteID) {
            throw new Error("Campos obrigátorios em branco!")
        }

        await prismaClient.pedidos.update({
            where: {
                id: pedidoId
            },
            data: {
                item1: novoItem1,
                item2: novoItem2,
                item3: novoItem3,
                item4: novoItem4,
                item5: novoItem5,
                quant1: novoQuant1,
                quant2: novoQuant2,
                quant3: novoQuant3,
                quant4: novoQuant4,
                quant5: novoQuant5,
                mesaID: mesaID,
                atendenteID: atendenteID
            }
        })
        return { message: "Pedido atualizado com sucesso!" }
    }
}