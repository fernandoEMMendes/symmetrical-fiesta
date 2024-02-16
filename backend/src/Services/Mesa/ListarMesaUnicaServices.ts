import prismaClient from "../../prisma"

interface MesaUnica {
    id_mesa: string
}

class ListarMesaUnicaServices {
    async execute({ id_mesa }: MesaUnica) {

        const resposta = await prismaClient.mesa.findUnique({
            where: {
                id_mesa: id_mesa
            },
            select: {
                id_mesa: true,
                numero_mesa: true
            }
        })
        return resposta
    }
}

export { ListarMesaUnicaServices }