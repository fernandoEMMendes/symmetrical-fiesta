import prismaClient from "../../prisma";
import { hash } from "bcryptjs";

interface CriarAtendentes {
  nome: string;
  cpf: string;
  senha: string;
}

class CriarAtendentesServices {
  async execute({ nome, cpf, senha }: CriarAtendentes) {
    const senhaCrypt = await hash(senha, 8);

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
