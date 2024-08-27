import express, { Request, Response } from "express";
import studentRouter from './routes/studentRoute'

require("dotenv").config();
const cors = require("cors"); 
const app = express();
const logger = require("morgan");
app.use(cors());

const PORT = process.env.PORT || 8000;
app.use(logger("dev"));
app.use(express.json());
app.get('/', (req: Request, res: Response)=>{
  res.status(200).json({
    message:"hello"
  })
})
app.listen(PORT, () => {
  // Start the server and listen on the specified port
  console.log(`Server is running on http://localhost:${PORT}`); // Log a message indicating the server is running
});

// Create an API
// GET, POST,PUT,PATCH,DELETE
// http:localhost:8000/customers
// //? customer
app.use("/api/v1", studentRouter)



























// npm i @prisma/client @types/bcrypt @types/express @types/jsonwebtoken bcrypt cors date-fns dotenv express jsonwebtoken prisma
// npm install --save-dev @types/node@^22.4.0 ts-node-dev@^2.0.0 tsc-alias@^1.8.10 tsconfig-paths@^4.2.0 typescript@^5.5.4
//? npx tsc --init
//? npx prisma init
//? npx prisma generate

