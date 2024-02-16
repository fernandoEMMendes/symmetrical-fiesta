import { Request, Response } from "express";
import { CriarAtendentesServices } from "../../Services/Atendente/criarAtendentesServices";

class CriarAtendentesController {
  async handle(req: Request, res: Response) {
    const { nome, cpf, senha } = req.body;

    const criarAtendentesServices = new CriarAtendentesServices();
    const resposta = await criarAtendentesServices.execute({
      nome,
      cpf,
      senha
    });
    return res.json(resposta);
  }
}

export { CriarAtendentesController };
