import prismaClient from "../../prisma"

interface Mesa {
    numero_mesa: string
}

class CriarMesaServices {
    async execute({ numero_mesa }: Mesa) {
    if (!numero_mesa){
        throw new Error('Campo em branco não é permitido!')
    }
    const MesaJaCadastrada = await prismaClient.mesa.findFirst({
        where: {
            numero_mesa: numero_mesa
        }
    })
    if(MesaJaCadastrada){
        throw new Error('Essa mesa já foi registrada!')
    }

    const mesa = await prismaClient.mesa.create({
        data:{
            numero_mesa: numero_mesa
        },
        select: {
            id_mesa: true,
            numero_mesa: true
        }
    })
    return { dados: mesa }
    }
}

export { CriarMesaServices }