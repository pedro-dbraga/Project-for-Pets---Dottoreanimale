import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';


import authRoutes from'./routes/auth.js';

import loginRouter from"./routes/auth.js";

import adminRouter from"./routes/admin.js";
import usersRouter from"./routes/user.js";

import FamilyRouter from"./routes/Family.js";
import InviteRouter from "./routes/Invites.js"

import petsRouter from"./routes/pets.js";
import vacinasRouter from"./routes/vaccines.js";
import petsTaskRouter from "./routes/tasks.js"

const app = express();

// middlewares
app.use(cors());
app.use(express.json()); // permite enviar JSON no body

app.use('/auth', authRoutes);

app.use("/login", loginRouter);
app.use("/admins", adminRouter);
app.use("/users", usersRouter);

app.use("/families", FamilyRouter);
app.use("/invites", InviteRouter);

app.use("/pets", petsRouter);
app.use("/vaccines", vacinasRouter);
app.use("/petstasks", petsTaskRouter);


// rodar servidor
app.listen(3001, () => {
  console.log("Servidor rodando na porta 3001");
});