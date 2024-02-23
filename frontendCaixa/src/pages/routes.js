import { Route, BrowserRouter, Routes } from "react-router-dom"

import Home from "./Home"
import Caixa from "./Caixa"

export default function Rotas() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Caixa" element={<Caixa />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}