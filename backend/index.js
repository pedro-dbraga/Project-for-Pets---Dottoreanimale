import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';


import authRoutes from'./routes/auth.js';
import usersRouter from"./routes/user.js";
import petsRouter from"./routes/pets.js";
import loginRouter from"./routes/auth.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json()); // permite enviar JSON no body

app.use('/auth', authRoutes);
app.use("/users", usersRouter);
app.use("/users", petsRouter);
app.use("/login", loginRouter);

// rodar servidor
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});