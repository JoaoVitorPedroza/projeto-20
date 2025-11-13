export class AppError extends Error {
    public status: number;

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.name = 'AppError';
    }
}

export class NotFoundError extends AppError {
    constructor(message: string = "Recurso não encontrado.") {
        super(message, 404);
        this.name = 'NotFoundError';
    }
}

export class ConflictError extends AppError {
    constructor(message: string = "Conflito de dados.") {
        super(message, 409);
        this.name = 'ConflictError';
    }
}

export class BadRequestError extends AppError { // <-- NOVO: Adicione o 400
    constructor(message: string = "Requisição inválida.") {
        super(message, 400);
        this.name = 'BadRequestError';
    }
}