import prismaClient from "../../prisma";

interface listarUnico {
    id: string
}

export class lsitarUnicoUsuarioService {
    async execute({ id }: listarUnico) {
        if (!id) {
            throw new Error("Campos em brancos não são permitidos!")
        }

        const resposta = await prismaClient.usuarios.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                nome: true,
            }
        })
        return resposta
    }
}