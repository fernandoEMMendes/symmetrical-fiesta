import { Route, BrowserRouter, Routes } from "react-router-dom"

import Home from "./Home"

export default function Rotas() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}