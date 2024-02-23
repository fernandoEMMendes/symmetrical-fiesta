import { Router } from "express"
import { isAuth } from "./middleware/isAuth";
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
import { criarPedidoController } from "./Controllers/Pedidos/criarPedidoController"
import { listarPedidoController } from "./Controllers/Pedidos/listarPedidoController"

//Usuários
import { criarUsuarioController } from "./Controllers/Usuarios/criarUsuarioController"
import { listarUnicoUsuarioController } from "./Controllers/Usuarios/listarUnicoUsuarioController"
import { loginUsuarioController } from "./Controllers/Usuarios/loginUsuarioController"

//Atendentes importações
import { CriarAtendentesController } from "./Controllers/Atendente/CriarAtendentesController";
import { AutenticarAtendenteController } from "./Controllers/Atendente/LoginAtendentesController";
import { ListarAtendenteTokenController } from "./Controllers/Atendente/ListarAtendenteTokenController";

//Mesas importações
import { CriarMesasController } from "./Controllers/Mesa/CriarMesasController";
import { ListarMesasController } from "./Controllers/Mesa/ListarMesasController";
import { ListarMesaUnicaController } from "./Controllers/Mesa/ListarMesaUnicaController";


//----------------------------------------------------------------------------------------//


//Produtos
rotas.post("/CriarProduto", upload.single("file"), new criarProdutoController().handle)
rotas.get("/ListarProduto/files", isAuth, new listarProdutoController().handle)
rotas.post("/ListarUnicoProduto/:id", isAuth, new listarUnicoProdutoController().handle)
rotas.delete("/ApagarProduto", isAuth, new apagarProdutoController().handle)
rotas.put("/AtualizarProduto", isAuth, new atualizarProdutoController().handle)

//Pedidos
rotas.post("/CriarPedido", isAuth, new criarPedidoController().handle)
rotas.get("/ListarPedido", isAuth, new listarPedidoController().handle)

//Usuários
rotas.post("/CriarUsuario", new criarUsuarioController().handle)
rotas.post("/ListarUnicoUsuario", isAuth, new listarUnicoUsuarioController().handle)
rotas.post("/LoginUsuario", new loginUsuarioController().handle)

//ATENDENTES
rotas.post("/CriarAtendentes", new CriarAtendentesController().handle);
rotas.post("/LoginAtendentes", new AutenticarAtendenteController().handle);
rotas.get(
    "/ListarAtendenteToken",
    isAuth,
    new ListarAtendenteTokenController().handle
);

//MESAS
rotas.post("/CriarMesas", new CriarMesasController().handle);
rotas.get("/ListarMesas", isAuth, new ListarMesasController().handle);
rotas.get(
    "/ListarMesaUnica/:id_mesa",
    isAuth,
    new ListarMesaUnicaController().handle
);