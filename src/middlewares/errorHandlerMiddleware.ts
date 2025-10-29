import { NextFunction, Request, Response } from 'express';
import { ConflictError, NotFoundError } from '../services/phoneService';

export function errorHandlerMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error.name === 'ValidationError') {
    return res.status(422).send({
      message: error.message || 'Erro de validação de dados.',
      details: (error as any).details
    });
  }
  if ('statusCode' in error) {
    const statusCode = (error as any).statusCode;
    if (statusCode >= 400 && statusCode < 500) {
      return res.status(statusCode).send({
        message: error.message
      });
    }
  }
  console.error("Erro Inesperado do Servidor:", error);
  return res.status(500).send({
    message: 'Erro interno do servidor.',
  });
}