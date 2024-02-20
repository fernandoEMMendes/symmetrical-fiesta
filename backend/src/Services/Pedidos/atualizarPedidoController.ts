import prismaClient from "../../prisma";

interface atualizar {
    novoItem1: string
    novoItem2: string
    novoItem3: string
    novoItem4: string
    novoItem5: string
    atendenteID: string
    mesaID: string
    pedidoId: string
}

export class atualizarPedidoService {
    async execute({ novoItem1, novoItem2, novoItem3, novoItem4, novoItem5, atendenteID, mesaID, pedidoId }: atualizar) {
        if (!novoItem1 || !mesaID || !atendenteID) {
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
                mesaID: mesaID,
                atendenteID: atendenteID
            }
        })
        return { message: "Pedido atualizado com sucesso!"}
    }
}