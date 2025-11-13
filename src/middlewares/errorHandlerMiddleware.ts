import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export function errorHandler(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (error instanceof AppError) {
        return res.status(error.status).send({
            message: error.message
        });
    }

    if (error.name === 'ValidationError') {
        const validationError = error as any;
        const messages = validationError.details.map((detail: any) => detail.message);
        return res.status(422).send({
            message: "Erro de validação. Verifique os campos.",
            details: messages
        });
    }

    console.error("ERRO CRÍTICO NO SERVIDOR:", error);
    return res.status(500).send({
        message: "Erro interno do servidor. Não foi possível processar a requisição."
    });
}