import pool from "../db.js";
import { v4 as uuidv4 } from "uuid";


async function createUser(name , email, hashedPassword) {
    const [verifyEmail] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log(verifyEmail);
    
    if (verifyEmail.length > 0) {
        throw new Error("Email já cadastrado");
    }
    
    const newUser = { id: uuidv4(), name, email, password: hashedPassword };

    await pool.query('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
    [newUser.id, newUser.name, newUser.email, newUser.password]);

    return newUser;
}

async function getUserById(id) {
    const user = await pool.query('SELECT email,name FROM users WHERE id = ?', [id]);

    if (user[0].length === 0) {
        throw new Error("Usuário não encontrado");
    }

    return user[0];
}

async function updateUser(id, name, email) {
    const user = await pool.query('SELECT email,name FROM users WHERE id = ?', [id]);

    if (user[0].length === 0) {
        throw new Error("Usuário não encontrado");
    }

    await pool.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email, id]);

    const updatedUser = await pool.query('SELECT email,name FROM users WHERE id = ?', [id]);

    return updatedUser[0];
}


async function newPassword(id, hashedPassword) {
    const user = await pool.query('SELECT id FROM users WHERE id = ?', [id]);

    if (user[0].length === 0) {
        throw new Error("Usuário não encontrado");
    }
    
    await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id]);

    return { success: true, message: "Senha atualizada com sucesso" };
}

async function deleteUser(id) {
    const user = await pool.query('SELECT id FROM users WHERE id = ?', [id]);

    if (user[0].length === 0) {
        throw new Error("Usuário não encontrado");
    }
    
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    await pool.query('DELETE FROM pets WHERE user_id = ?', [id]);
    return { success: true, message: "Usuário removido com sucesso" };
}




export  default { createUser, getUserById, updateUser, deleteUser , newPassword};