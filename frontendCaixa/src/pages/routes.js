import { Route, BrowserRouter, Routes } from "react-router-dom";

import Home from "./Home";
import Caixa from "./Caixa";
import Dashboard from "./Dashboard/DashHome";
import DashProdutos from "./Dashboard/DashProdutos";
import DashPedidos from "./Dashboard/DashPedidos";
import CriarProdutos from "./Dashboard/DashProdutos";
import { DashListarProdutos } from "./Dashboard/DashHome/DashListarProdutos/DashListarProdutos";
import Mesa_Unica from "./Dashboard/Mesa_Unica";

export default function Rotas() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Caixa" element={<Caixa />} />

          <Route path="/Dashboard" element={<Dashboard />} />

          <Route path="/DashProdutos" element={<DashProdutos />} />
          <Route path="/ListarProdutos" element={<DashListarProdutos />} />
          <Route path="/CriarProdutos" element={<CriarProdutos />} />

          <Route path="/DashPedidos" element={<DashPedidos />} />

          <Route path="/MesaUnica" element={<Mesa_Unica />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
