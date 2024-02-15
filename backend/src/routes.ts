import { Router } from "express"
import multer from "multer"
import uploadConfig from "./config/multer"

export const rotas = Router()
const upload = multer(uploadConfig.upload("./tmp"))

import { criarProdutoController } from "./Controllers/Produtos/criarProdutoController"



rotas.post("/CriarProduto", upload.single("file"), new criarProdutoController().handle)