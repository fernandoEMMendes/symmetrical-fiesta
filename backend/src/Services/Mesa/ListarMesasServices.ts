import prismaClient from "../../prisma"

class ListarMesaServices {
    async execute() {
        const mesas = await prismaClient.mesa.findMany({
            orderBy: {
                numero_mesa: "asc"
            }
        })
        return (mesas)
    }
}

export { ListarMesaServices }