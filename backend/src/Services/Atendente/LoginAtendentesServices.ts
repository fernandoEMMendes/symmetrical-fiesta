import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AutenticarAtendente {
  nome: string;
  password: string;
}

class AutenticarAtendenteServices {
  async execute({ nome, password }: AutenticarAtendente) {
    const atendente = await prismaClient.atendente.findFirst({
      where: {
        nome: nome,
      },
    });
    if (!atendente) {
      throw new Error("Nome/Senha incorretos");
    }
    const autenticado = await compare(password, atendente.senha);
    if (!autenticado) {
      throw new Error("Nome/Senha incorretos");
    }

    const token = sign(
      {
        id: atendente.id_atendente,
        nome: atendente.nome,
      },
      process.env.JWT_BAR,
      {
        subject: atendente.id_atendente,
        expiresIn: "12h",
      }
    );

    return {
      id: atendente.id_atendente,
      nome: atendente.nome,
      token: token,
    };
  }
}

export { AutenticarAtendenteServices };
