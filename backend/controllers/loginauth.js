
import { loginUser, generateToken, verifyToken } from '../models/loginmodel.js';


async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios' });
  }

  const user = await loginUser(email, password);

  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = generateToken(user);
  return res.status(200).json({ message: 'Login realizado com sucesso', token });
}

// Middleware de validação de token
async function validateToken(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    
    next();
  } catch {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

export   { login, validateToken };