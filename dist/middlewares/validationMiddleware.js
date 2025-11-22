"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = validateSchema;
function validateSchema(schema) {
    return function (req, res, next) {
        var _a = schema.validate(req.body, { abortEarly: false }), error = _a.error, value = _a.value;
        if (error) {
            var details = error.details.map(function (d) { return d.message; });
            var validationError = new Error("Erro de validação de dados.");
            validationError.name = "ValidationError";
            validationError.details = details;
            throw validationError;
        }
        req.body = value;
        next();
    };
}
