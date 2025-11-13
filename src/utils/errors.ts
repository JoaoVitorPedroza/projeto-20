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

export class UnauthorizedError extends AppError {
    constructor(message: string = "Não autorizado.") {
        super(message, 401);
        this.name = 'UnauthorizedError';
    }
}
