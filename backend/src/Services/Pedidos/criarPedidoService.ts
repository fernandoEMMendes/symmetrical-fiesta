import prismaClient from "../../prisma";

interface criar {
    item1: string
    item2: string
    item3: string
    item4: string
    item5: string
    quant1: string
    quant2: string
    quant3: string
    quant4: string
    quant5: string
    atendenteID: string
    mesaID: string
}

export class criarPedidoService {
    async execute({ item1, item2, item3, item4, item5, mesaID, atendenteID, quant1, quant2, quant3, quant4, quant5 }: criar) {
        if (!item1 || !quant1 || !mesaID || !atendenteID) {
            throw new Error("Campos obrigátorios em branco!")
        }

        await prismaClient.pedidos.create({
            data: {
                item1: item1,
                item2: item2,
                item3: item3,
                item4: item4,
                item5: item5,
                quant1: quant1,
                quant2: quant2,
                quant3: quant3,
                quant4: quant4,
                quant5: quant5,
                atendenteID: atendenteID,
                mesaID: mesaID
            }
        })
        return { message: "Pedido criado com sucesso!" }
    }
}