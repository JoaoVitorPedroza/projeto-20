"use strict";
// src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express")); // <--- ESTA LINHA É ESSENCIAL
require("dotenv/config");
// Importar Middlewares e Rotas
var errorHandlerMiddleware_1 = require("./middlewares/errorHandlerMiddleware");
var phoneRouter_1 = __importDefault(require("./routes/phoneRouter"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(phoneRouter_1.default);
app.use(errorHandlerMiddleware_1.errorHandlerMiddleware);
exports.default = app;
