"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
var errors_1 = require("../utils/errors");
function errorHandler(error, req, res, next) {
    if (error instanceof errors_1.AppError) {
        return res.status(error.status).send({
            message: error.message
        });
    }
    if (error.name === 'ValidationError') {
        var validationError = error;
        var messages = validationError.details.map(function (detail) { return detail.message; });
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
