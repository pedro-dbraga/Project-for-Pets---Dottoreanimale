import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from "uuid";
import UserModel from "../models/usersmodel.js";


async function createUserService(name, email, password){

    const id = uuidv4();

    const hashedPassword = await bcrypt.hash(password, 8);
    
    const user = {id , name, email, password:hashedPassword}
    
    await UserModel.createUser(user);
}

async function getUserById(userId){

    const user = await UserModel.getUserById(userId);

    if (!user) {
        throw new Error("Usuário não encontrado");
    }
    return user;
}

async function updateUser(id, name, email){
    const userValues = {};

    if (name !== undefined) userValues.name = name;
    if (email !== undefined) userValues.email = email;
    

    const updatedUser = await UserModel.updateUser(id, userValues);

    if (updatedUser.affectedRows === 0) {
        console.log("Ninguém foi atualizado: O ID não existe.");
    } 
    
    if (updatedUser.changedRows === 0) {
        console.log("Os dados já eram os mesmos.");
    } 
    
    console.log("Sucesso! Registro atualizado.");

    return userValues;
}

async function newPassword(userId, password){

    const hashedPassword = await bcrypt.hash(password, 8);
    
    const newPass = await UserModel.newPassword(userId, hashedPassword);
    
    if(newPass.affectedRows === 0){
         throw new Error("Erro ao atualizar senha")
    }
}

async function deleteUser(userId){
    /* esse user é dono de alguma familia
        ele é dono de algum pet? */
    const result = await UserModel.deleteUser(userId);

    if(result.affectedRows === 0) {
        throw new Error("Usuario não encontrado!");
    }
}

export default {createUserService, getUserById, updateUser, newPassword, deleteUser}