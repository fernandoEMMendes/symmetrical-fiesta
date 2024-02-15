import { Router } from "express"
import multer from "multer"
import uploadConfig from "./config/multer"

export const rotas = Router()
const upload = multer(uploadConfig.upload("./tmp"))

//Produtos
import { criarProdutoController } from "./Controllers/Produtos/criarProdutoController"
import { listarProdutoController } from "./Controllers/Produtos/listarProdutoController"
import { listarUnicoProdutoController } from "./Controllers/Produtos/listarUnicoProdutoController"
import { apagarProdutoController } from "./Controllers/Produtos/apagarProdutoController"
import { atualizarProdutoController } from "./Controllers/Produtos/atualizarProdutoController"

//Pedidos


//Usuários


//----------------------------------------------------------------------------------------//

//Produtos
rotas.post("/CriarProduto", upload.single("file"), new criarProdutoController().handle)
rotas.get("/ListarProduto/files", new listarProdutoController().handle)
rotas.post("/ListarUnicoProduto/:id", new listarUnicoProdutoController().handle)
rotas.delete("/ApagarProduto", new apagarProdutoController().handle)
rotas.put("/AtualizarProduto", new atualizarProdutoController().handle)

//Pedidos


//Usuários