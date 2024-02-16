import prismaClient from "../../prisma";

interface listarUnico {
    id: string
}

export class lsitarUnicoUsuarioService {
    async execute({ id }: listarUnico) {
        if (!id) {
            throw new Error("Campos em brancos não são permitidos!")
        }

        const verificarId = await prismaClient.usuarios.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                nome: true,
            }
        })
        if (!verificarId) {
            throw new Error("Usuário não encontrado!")
        }
        return verificarId
    }
}