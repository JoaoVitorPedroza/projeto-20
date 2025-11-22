"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var phoneRouter_1 = __importDefault(require("./routes/phoneRouter"));
var rechargeRouter_1 = __importDefault(require("./routes/rechargeRouter"));
var clientRouter_1 = __importDefault(require("./routes/clientRouter")); // M
var errorHandlerMiddleware_1 = require("./middlewares/errorHandlerMiddleware");
var app = (0, express_1.default)();
app.use(express_1.default.json());
var PORT = process.env.PORT || 5000;
// I
app.use('/phones', phoneRouter_1.default);
app.use('/recharges', rechargeRouter_1.default);
app.use('/clients', clientRouter_1.default); // M
app.use(errorHandlerMiddleware_1.errorHandler);
app.listen(PORT, function () {
    console.log("\uD83D\uDE80 Servidor rodando na porta ".concat(PORT));
});
