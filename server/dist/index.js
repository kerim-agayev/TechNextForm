import express from "express";
import studentRouter from './routes/studentRoute';
require("dotenv").config();
const cors = require("cors");
const app = express();
const logger = require("morgan");
app.use(cors());
const PORT = process.env.PORT || 8000;
app.use(logger("dev"));
app.use(express.json());
app.get('/', (req, res) => {
    res.status(200).json({
        message: "hello"
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.use("/api/v1", studentRouter);
