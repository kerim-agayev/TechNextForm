

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