// src/middlewares/errorHandlerMiddleware.ts

import { Request, Response, NextFunction } from 'express';
// Importa a classe base HttpError, que contém o 'status' para erros 4xx
import { HttpError } from '../utils/errors';

// O middleware de erro deve sempre aceitar 4 argumentos: err, req, res, next
export function errorHandlerMiddleware(err: HttpError | any, req: Request, res: Response, next: NextFunction) {

    // 1. TRATAMENTO DE ERROS CUSTOMIZADOS (404, 409, 400, etc.)
    // Testamos a existência da propriedade 'status'.
    // Se o erro foi lançado usando as classes HttpError, ele terá o status e a mensagem correta.
    if (err.status) {
        console.error(`[STATUS ${err.status}]: ${err.message}`);
        return res.status(err.status).send({ message: err.message });
    }

    // 2. TRATAMENTO DE ERROS DE VALIDAÇÃO (422 Unprocessable Entity)
    // Isso é comum com bibliotecas como Joi ou Yup que anexam o array 'details' ao erro.
    if (err.details) {
        console.error(`[STATUS 422]: Erro de validação: ${JSON.stringify(err.details)}`);
        return res.status(422).send({
            message: "Erro de validação de dados.",
            details: err.details.map((d: any) => d.message)
        });
    }

    // 3. TRATAMENTO DE ERROS INTERNOS NÃO PREVISTOS (500 Internal Server Error)
    // Se o erro chegou até aqui, é um erro inesperado no servidor (ex: falha de banco de dados).
    console.error("--- ERRO INTERNO NÃO TRATADO (500) ---");
    console.error(err);
    console.error("-----------------------------------------");

    // Retorna uma mensagem genérica para o cliente
    return res.status(500).send({ message: "Erro interno do servidor." });
}