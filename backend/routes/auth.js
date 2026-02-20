import express from'express';


import { login } from'../controllers/loginauth.js';
import authMiddleware from'../middleware/auth.js';

const router = express.Router();

router.post('/login', login);
router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Acesso permitido!', user: req.user });
});

export default router;