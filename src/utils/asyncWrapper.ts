import { Request, Response, NextFunction } from 'express';

// Este wrapper garante que erros assíncronos sejam passados para o Express
// sem precisar do express-async-errors
export const asyncWrapper = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
};