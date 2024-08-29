import { db } from "@/db/db";
import { Request, Response, RequestHandler } from "express";
import bcyrpt from "bcrypt";
import { generateToken } from "../utils/generateJWT";



//? get login
const authorizeUser: RequestHandler = async (req, res) => {
  try {
    //? receive the data
    const {
        email,
        password
      } = req.body;
      
      const AccessToken = generateToken({email, password})
   
  
    res.status(200).json({ accessToken:AccessToken, error: null });
  } catch (error) {
    res.status(500).json({ error: "error bas verdi.", data: null });
  }
};




export {
  authorizeUser,
};
