import prismaClient from "../../prisma"

class ListarMesaServices {
    async execute() {
        const mesas = await prismaClient.mesa.findMany({})
        return (mesas)
    }
}

export { ListarMesaServices }