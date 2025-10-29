
import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
export function validateSchema<T>(schema: ObjectSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const details = error.details.map((d) => d.message);
      const validationError = new Error("Erro de validação de dados.");
      (validationError as any).name = "ValidationError";
      (validationError as any).details = details;

      throw validationError;
    }

    req.body = value;
    next();
  };
}
