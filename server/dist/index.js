"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentRoute_1 = __importDefault(require("./routes/studentRoute"));
require("dotenv").config();
const cors = require("cors");
const app = (0, express_1.default)();
const logger = require("morgan");
app.use(cors());
const PORT = process.env.PORT || 8000;
app.use(logger("dev"));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).json({
        message: "hello"
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.use("/api/v1", studentRoute_1.default);
