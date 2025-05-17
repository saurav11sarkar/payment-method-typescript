"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), ".env") });
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DB_URL,
    env: process.env.NODE_ENV,
    round: process.env.SALT_ROUND,
    jwt_secret: process.env.JWT_SECRET,
    store_id: process.env.STORE_ID,
    store_password: process.env.STORE_PASSWORD,
};
