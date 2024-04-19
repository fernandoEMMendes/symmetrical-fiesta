import prismaClient from "../../prisma";

interface fechar {
    id: string
}

export class FecharMesaService{
    async execute({id}:fechar){
        await prismaClient.pedidos.deleteMany({
            where: {
                mesaID: id
            }
        })
        return {dados: "Mesa fechada com sucesso!"}
    }
}