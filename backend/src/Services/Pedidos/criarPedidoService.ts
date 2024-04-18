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

        console.log(produtoID, mesaID, quant)

        const verificarProd = await prismaClient.pedidos.findFirst({
            where: {
                mesaID: mesaID,
                produtoID: produtoID
            }
        })

        if (!verificarProd) {
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
        if (verificarProd) {

            const novaQuant = quant + verificarProd.quant

            const resposta = await prismaClient.pedidos.updateMany({
                where: {
                    mesaID: verificarProd.mesaID,
                    produtoID: verificarProd.produtoID
                }, data: {
                    quant: novaQuant
                }
            })
            return resposta
        }
    }
}