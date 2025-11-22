"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("dotenv/config");
var phoneRouter_1 = __importDefault(require("../routes/phoneRouter"));
var rechargeRouter_1 = __importDefault(require("../routes/rechargeRouter"));
var clientRouter_1 = __importDefault(require("../routes/clientRouter")); // <-- NOVO
var errorHandlerMiddleware_1 = require("../middlewares/errorHandlerMiddleware");
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', clientRouter_1.default);
app.use('/', phoneRouter_1.default);
app.use('/', rechargeRouter_1.default);
app.use(errorHandlerMiddleware_1.errorHandler);
exports.default = app;
