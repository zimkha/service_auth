"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const consola_1 = __importDefault(require("consola"));
const helmet_1 = __importDefault(require("helmet"));
const env = config_1.default.get('env');
const port = config_1.default.get('PORT');
function start() {
    const app = express_1.default();
    try {
        if (env === "production") {
            app.use(helmet_1.default());
        }
        app.listen(port, () => consola_1.default.info(`Server running on port ${port}`));
    }
    catch (e) {
        throw new Error(e.message);
    }
}
exports.start = start;
