import bcrypt from 'bcryptjs';
import UserModel from "../models/usersmodel.js";

async function createUser(req, res) {
    const {name, email, password} = req.body;

    if (!name) {
        return res.status(400).json({ message: "Preencha o campo do nome!" });
    }
    if (!email) {
        return res.status(400).json({ message: "Preencha o campo do email!" });
    }
    if (!password) {
        return res.status(400).json({ message: "Preencha o campo da senha!" });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "E-mail inválido." });
    }
    
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,20}$/;
    if (!nameRegex.test(name)) {
        return res.status(400).json({ message: "Nome inválido. Use apenas letras e espaços." });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 8);

        const newUser = await UserModel.createUser(name, email, hashedPassword);
        res.status(201).json(newUser,"controller");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err}`});
    }
}

async function getUserById(req, res) {
    try {
        const userId = req.user.id;

        const user = await UserModel.getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.json(user);
    } catch (err) { 
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar usuário" });
    }
}

async function updateUser(req, res) {
    try {
        const userId = req.params.id;
        const {name , email} = req.body;
        const updatedUser = await UserModel.updateUser(userId, name, email);
        console.log(req.body)
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
}

async function newPassword(req, res) {
    const userId = req.params.id;
    const { password , confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "As senhas não coincidem" });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const userP = await UserModel.newPassword(userId, hashedPassword);
        res.status(201).json(userP);

    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao atualizar senha" });
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        const deletedUser = await UserModel.deleteUser(userId);
        res.json(deletedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao remover usuário" });
    }
}

export default { createUser, getUserById, updateUser, deleteUser, newPassword };