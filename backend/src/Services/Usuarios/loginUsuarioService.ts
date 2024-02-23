import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken"

interface login {
    nome: string
    password: string
}

export class loginUsuarioService {
    async execute({ nome, password }: login) {
        const verificarNome = await prismaClient.usuarios.findFirst({
            where: {
                nome: nome
            }
        })
        if (!verificarNome) {
            throw new Error("Nome/Senha incorretos")
        }

        const verificarPassword = await compare(password, verificarNome.senha)
        if (!verificarPassword) {
            throw new Error("Nome/Senha incorretos")
        }

        const token = sign(
            {
                id: verificarNome.id,
                nome: verificarNome.nome
            },
            process.env.JWT_BAR,
            {
                subject: verificarNome.id,
                expiresIn: "12h",
            }
        )
        return {
            id: verificarNome.id,
            nome: verificarNome.nome,
            token: token
        }
    }
}