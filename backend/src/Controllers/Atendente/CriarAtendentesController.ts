import { Request, Response } from "express";
import { CriarAtendentesServices } from "../../Services/Atendente/CriarAtendentesServices";

class CriarAtendentesController {
  async handle(req: Request, res: Response) {
    const { nome, cpf, password } = req.body;

    const criarAtendentesServices = new CriarAtendentesServices();
    const resposta = await criarAtendentesServices.execute({
      nome,
      cpf,
      password
    });
    return res.json(resposta);
  }
}

export { CriarAtendentesController };
