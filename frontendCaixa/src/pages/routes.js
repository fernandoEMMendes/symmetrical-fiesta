import { Route, BrowserRouter, Routes } from "react-router-dom"

import Home from "./Home"
import Caixa from "./Caixa"
import Dashboard from "./Dashboard/DashHome"
import DashProdutos from "./Dashboard/DashProdutos"
import DashPedidos from "./Dashboard/DashPedidos"
import CriarProdutos from "./Dashboard/DashProdutos"

export default function Rotas() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Caixa" element={<Caixa />} />
                    
                    <Route path="/Dashboard" element={<Dashboard/>}/>
                
                
                    <Route path="/DashProdutos" element={<DashProdutos/>}/>
                    <Route path="/CriarProdutos" element={<CriarProdutos/>}/>


                    <Route path="/DashPedidos" element={<DashPedidos/>}/>

                </Routes>
            </BrowserRouter>
        </div>
    )
}