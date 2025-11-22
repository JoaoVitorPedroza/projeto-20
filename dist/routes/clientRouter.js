"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
// I
var clientController_1 = require("../controllers/clientController");
var clientRouter = (0, express_1.Router)();
// R
// E
clientRouter.get('/:document', clientController_1.clientController.listPhonesByDocument);
// E
clientRouter.delete('/:document', clientController_1.clientController.deleteClient);
exports.default = clientRouter;
