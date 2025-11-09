// src/utils/errors.ts (APENAS CLASSES)

class HttpError extends Error {
    public status: number;

    // A chamada super(message, status) no construtor de uma classe que estende Error pode ser problemática
    // no TypeScript/JavaScript. O construtor deve ser simplificado.
    constructor(message: string, status: number) {
        super(message); // Apenas 'message' é obrigatório para Error
        this.name = this.constructor.name;
        this.status = status;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Exporta as classes que serão usadas na aplicação
export { HttpError };

// Erros Específicos (IMPORTANTE: Mantenha estes exportados!)
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
// ... (outras classes, como BadRequestError 400, se necessário)