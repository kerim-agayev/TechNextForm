// import jwt, { JwtPayload } from "jsonwebtoken";
 
// interface SignOption {
//   expiresIn?: string | number;
// }
// const DEFAULT_SIGN_OPTION: SignOption = {
//   expiresIn: "1h",
// };
// export function generateAccessToken(
//   payload: JwtPayload,
//   options: SignOption = DEFAULT_SIGN_OPTION
// ) {
//   const secret = process.env.SECRET_KEY;
//   // Use this command to generate SECRET_KEY: openssl rand -base64 32
//   const token = jwt.sign(payload, secret!, options);
//   return token;
// }

import jwt from 'jsonwebtoken';

// Secret key for signing the JWT
const secretKey = process.env.SECRET_KEY;//

interface UserCredentials {
  email: string;
  password: string;
}
export function generateToken(credentials: UserCredentials): string {
    const { email, password } = credentials;
  
    if (email === 'kerimagayev156@gmail.com' && password === 'kerim1234') {
 
      const token = jwt.sign({ email: email }, secretKey!, { expiresIn: '24h' }); 
      return token;
    } else {
      throw new Error('sehv email ve ya password');
      
    }
  }