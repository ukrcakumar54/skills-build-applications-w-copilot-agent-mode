"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoUri = exports.disconnectDatabase = exports.connectDatabase = void 0;
var database_1 = require("./config/database");
Object.defineProperty(exports, "connectDatabase", { enumerable: true, get: function () { return database_1.connectDatabase; } });
Object.defineProperty(exports, "disconnectDatabase", { enumerable: true, get: function () { return database_1.disconnectDatabase; } });
Object.defineProperty(exports, "mongoUri", { enumerable: true, get: function () { return database_1.mongoUri; } });
