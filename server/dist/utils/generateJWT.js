"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = process.env.SECRET_KEY;
function generateToken(credentials) {
    const { email, password } = credentials;
    if (email === 'kerimagayev156@gmail.com' && password === 'kerim1234') {
        const token = jsonwebtoken_1.default.sign({ email: email }, secretKey, { expiresIn: '24h' });
        return token;
    }
    else {
        throw new Error('sehv email ve ya password');
    }
}
