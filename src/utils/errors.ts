// src/utils/errors.ts (APENAS CLASSES)

class HttpError extends Error {
    public status: number;
    constructor(message: string, status: number) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
export { HttpError };
export class NotFoundError extends HttpError {
    constructor(message: string = 'Recurso não encontrado.') {
        super(message, 404);
    }
}

export class ConflictError extends HttpError {
    constructor(message: string = 'O recurso já existe ou há um conflito de dados.') {
        super(message, 409);
    }
}
