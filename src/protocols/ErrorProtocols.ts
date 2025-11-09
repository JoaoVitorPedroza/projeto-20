// src/protocols/ErrorProtocols.ts
export class ConflictError extends Error {
    statusCode = 409;
    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
    }
}

export class NotFoundError extends Error {
    statusCode = 404;
    constructor(message: string) {
        super(message);
        this.name = 'NotFoundError';
    }
}