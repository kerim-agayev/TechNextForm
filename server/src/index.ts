import express, { Request, Response } from "express";
import studentRouter from './routes/studentRoute';
import loginRouter from './routes/login';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
//"dev": "tsnd --respawn -r tsconfig-paths/register --pretty --transpile-only ./src/index.ts",
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: "hello"
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});




app.use("/api/v1", studentRouter);
app.use("/api/v1", loginRouter);
