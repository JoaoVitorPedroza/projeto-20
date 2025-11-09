// src/middlewares/errorHandlerMiddleware.ts

import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../utils/errors';

export function errorHandlerMiddleware(err: HttpError | any, req: Request, res: Response, next: NextFunction) {
    if (err.status) {
        console.error(`[STATUS ${err.status}]: ${err.message}`);
        return res.status(err.status).send({ message: err.message });
    }

    if (err.details) {
        console.error(`[STATUS 422]: Erro de validação: ${JSON.stringify(err.details)}`);
        return res.status(422).send({
            message: "Erro de validação de dados.",
            details: err.details.map((d: any) => d.message)
        });
    }

    console.error("--- ERRO INTERNO NÃO TRATADO (500) ---");
    console.error(err);
    console.error("-----------------------------------------");


    return res.status(500).send({ message: "Erro interno do servidor." });
}