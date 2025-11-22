"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneService = void 0;
exports.listAllPhones = listAllPhones;
exports.listPhonesByClientDocument = listPhonesByClientDocument;
exports.createPhone = createPhone;
exports.removePhoneByNumber = removePhoneByNumber;
exports.listRechargesByPhone = listRechargesByPhone;
exports.rechargePhone = rechargePhone;
exports.deleteClient = deleteClient;
var phoneRepository_1 = require("../repositories/phoneRepository");
var rechargeRepository_1 = require("../repositories/rechargeRepository");
var clientRepository_1 = require("../repositories/clientRepository");
var errors_1 = require("../utils/errors");
function listAllPhones() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, phoneRepository_1.phoneRepository.getPhones()];
        });
    });
}
function listPhonesByClientDocument(clientDocument) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            // C
            return [2 /*return*/, phoneRepository_1.phoneRepository.findByClientDocument(clientDocument)];
        });
    });
}
function createPhone(phoneData) {
    return __awaiter(this, void 0, void 0, function () {
        var phoneNumber, clientDocument, name, existingPhone;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phoneNumber = phoneData.phoneNumber, clientDocument = phoneData.clientDocument, name = phoneData.name;
                    return [4 /*yield*/, phoneRepository_1.phoneRepository.findByPhoneNumber(phoneNumber)];
                case 1:
                    existingPhone = _a.sent();
                    if (existingPhone) {
                        throw new errors_1.ConflictError("Telefone já cadastrado.");
                    }
                    // I
                    return [4 /*yield*/, clientRepository_1.clientRepository.createClient({ document: clientDocument, name: name })];
                case 2:
                    // I
                    _a.sent();
                    //I
                    return [2 /*return*/, phoneRepository_1.phoneRepository.createPhone(phoneData)];
            }
        });
    });
}
function removePhoneByNumber(phoneNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var phone, recharges;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phoneRepository_1.phoneRepository.findByPhoneNumber(phoneNumber)];
                case 1:
                    phone = _a.sent();
                    if (!phone) {
                        throw new errors_1.NotFoundError("Telefone não encontrado para exclusão.");
                    }
                    return [4 /*yield*/, rechargeRepository_1.rechargeRepository.findRechargesByPhone(phone.id)];
                case 2:
                    recharges = _a.sent();
                    if (recharges && recharges.length > 0) {
                        throw new errors_1.ConflictError("Não é possível excluir o telefone. Existem recargas associadas.");
                    }
                    return [4 /*yield*/, phoneRepository_1.phoneRepository.deleteByPhoneNumber(phoneNumber)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function listRechargesByPhone(phoneNumber) {
    return __awaiter(this, void 0, void 0, function () {
        var phone;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, phoneRepository_1.phoneRepository.findByPhoneNumber(phoneNumber)];
                case 1:
                    phone = _a.sent();
                    if (!phone) {
                        throw new errors_1.NotFoundError("Telefone não encontrado para listar recargas.");
                    }
                    return [2 /*return*/, rechargeRepository_1.rechargeRepository.findRechargesByPhone(phone.id)];
            }
        });
    });
}
function rechargePhone(rechargeData) {
    return __awaiter(this, void 0, void 0, function () {
        var phoneNumber, amount, phone;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phoneNumber = rechargeData.phoneNumber, amount = rechargeData.amount;
                    return [4 /*yield*/, phoneRepository_1.phoneRepository.findByPhoneNumber(phoneNumber)];
                case 1:
                    phone = _a.sent();
                    if (!phone) {
                        throw new errors_1.NotFoundError("Telefone não encontrado para recarga.");
                    }
                    return [2 /*return*/, rechargeRepository_1.rechargeRepository.createRecharge({ phoneId: phone.id, amount: amount })];
            }
        });
    });
}
/**
 * @description NOVA FUNÇÃO
 * CHAMAR NO CLIENT
 */
function deleteClient(clientDocument) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, clientRepository_1.clientRepository.deleteClient(clientDocument)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.phoneService = {
    createPhone: createPhone,
    listAllPhones: listAllPhones,
    listPhonesByClientDocument: listPhonesByClientDocument,
    removePhoneByNumber: removePhoneByNumber,
    listRechargesByPhone: listRechargesByPhone,
    rechargePhone: rechargePhone,
    deleteClient: deleteClient,
};
exports.default = exports.phoneService;
