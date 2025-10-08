"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: "sqlite",
    database: "basedatos.sqlite",
    synchronize: true,
    logging: true,
    entities: [
        path_1.default.join(__dirname, "/entidades/**/*.ts"),
        path_1.default.join(__dirname, "/entidades/**/*.js")
    ],
});
//# sourceMappingURL=datasource.js.map