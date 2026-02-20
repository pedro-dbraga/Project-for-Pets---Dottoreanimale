import UserService from "../service/UserService.js";

async function createUser(req, res) {
    const {name, email, password} = req.body;
    const errors = [];
    
    if (!name) errors.push("Preencha o campo do nome!")
    if (!email) errors.push("Preencha o campo do email!");
    if (!password) errors.push("Preencha o campo da senha!" );
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{2,20}$/;
    const passwordRegex = /^.{1,10}$/;

    if (!emailRegex.test(email)) errors.push("E-mail inválido.");
    if (!nameRegex.test(name)) errors.push("Nome Inválido. Use apenas letras e espaços.")

    if(errors.length > 0) {
        return res.status(400).json({messages: errors});
    }

    try {
        await UserService.createUserService(name, email, password);
        res.status(201).json({message: 'User created successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: `${err}`});
    }
}

async function getUserById(req, res) {
    try {
        const userId = req.user.id;
        const [user] = await UserService.getUserById(userId);

        res.status(200).json(user);
    } catch (err) { 
        console.error(err);
        res.status(500).json({ message: "Erro ao buscar usuário" });
    }
}

async function updateUser(req, res) {

    try {
        const userId = req.user.id;
        const {name , email} = req.body;
        const updatedUser = await UserService.updateUser(userId, name, email);
        console.log(userId, updatedUser)
        res.status(200).json({message:"Usuario Atualizado", userId, ...updatedUser});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao atualizar usuário" });
    }
}

async function newPassword(req, res) {
    const userId = req.user.id;
    const { password , confirmPassword } = req.body;
    const errors = {};
    
    if(!password || !confirmPassword) errors.push("Todos os campos devem ser preenchidos");
    if (password !== confirmPassword) errors.push("As senhas não coincidem");
    
    if(errors.length > 0) {
        return res.status(400).json({messages: errors});
    }
    try {
        await UserService.newPassword(userId, password);
        res.status(200).json("Senha Atualizada Com Sucesso");

    }catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao atualizar senha" });
    }
}

async function deleteUser(req, res) {
    const userId = req.user.id;

    try {
        await UserService.deleteUser(userId);
        res.status(200).json("Usuario Deletado com Sucesso!");
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erro ao remover usuário" });
    }
}

export default { createUser, getUserById, updateUser, deleteUser, newPassword };