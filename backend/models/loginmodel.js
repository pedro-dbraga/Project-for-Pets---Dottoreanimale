import jwt from'jsonwebtoken';
import { promisify } from'util';
import pool from "../db.js"; 
import bcrypt from'bcryptjs';


// Função de login (verifica se o usuário existe no banco)

async function loginUser(email, password) {
  const [verifyUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
  console.log("resultado da query:", verifyUser);
  if (verifyUser.length === 0) {
    throw new Error("Usuário não encontrado");
  }
  const user = verifyUser[0];
  const passwordMatch = await bcrypt.compare(password, user.password);


  if(!passwordMatch){
    throw new Error('Senha incorreta');
  }
  return user;
}

// Gera um token JWT
function generateToken(user) {
  return jwt.sign({id: user.id}, process.env.JWT_KEY, {
    subject: user.id,
    expiresIn: "1d",
  });
}

// Verifica a validade do token
async function verifyToken(token) {
  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);
    return decoded;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export { loginUser, generateToken, verifyToken };