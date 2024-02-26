import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface CriarAtendentes {
  nome: string;
  cpf: string;
  password: string;
}

class CriarAtendentesServices {
  async execute({ nome, cpf, password }: CriarAtendentes) {
    const senhaCrypt = await hash(password, 8);

    await prismaClient.atendente.create({
      data: {
        nome: nome,
        cpf: cpf,
        senha: senhaCrypt,
      },
    });
    return { Dados: "Cadastro Realizado com Sucesso" };
  }
}

export { CriarAtendentesServices };
