import prismaClient from "../../prisma";
import { hash } from "bcryptjs"

interface criar {
    nome: string
    senha: string
}

export class criarUsuarioService {
    async execute({ nome, senha }: criar) {
        if (!nome || !senha) {
            throw new Error("Campos em brancos não são permitidos!")
        }

        const senhaCrypt = await hash(senha, 8)
        await prismaClient.usuarios.create({
            data: {
                nome: nome,
                senha: senhaCrypt
            }
        })
        return { message: "Usuário criado com sucesso!" }
    }
}