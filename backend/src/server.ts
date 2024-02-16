import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"
import cors from "cors"
import path from "path"

import { rotas } from "./routes";

const app = express()
app.use(cors())
app.use(express.json())
app.use(rotas)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(401).json({
            error: err.message
        })
    }

    return res.status(500).json({
        status: "Erro",
        message: "Erro interno do servidor"
    })
})

app.use(
    "/files",
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.listen(7600, () => { console.log("Servidor ligado | Port: 7600 | (￣o￣) . z Z") })