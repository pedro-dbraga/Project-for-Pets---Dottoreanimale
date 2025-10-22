import pool from "../db.js";
import { v4 as uuidv4 } from "uuid";


async function createPet(userId, name, spicies, breed, age, weight, color){
    const newPet = { id: uuidv4(), userId, name, spicies, breed, age, weight, color};

    await pool.query('INSERT INTO pets (id, user_id, name, spicies, breed, age, weight, color) VALUES (?,?,?,?,?,?,?,?)',
    [newPet.id, newPet.userId, newPet.name, newPet.spicies, newPet.breed, newPet.age, newPet.weight, newPet.color]);
    return newPet;
}
async function updatePet(userId, id, name, spicies, breed, age, weight, color) {

    const verifyPet = await pool.query('SELECT id, user_id FROM pets WHERE user_id = ? AND id = ?', [userId, id]);
    if (verifyPet.length === 0) {
        throw new Error("Pet não encontrado");
    }

     await pool.query(
        'UPDATE pets SET name = ?, spicies = ?, breed = ?, age = ?, weight = ?, color = ? WHERE user_id = ? AND id = ?',
        [name, spicies, breed, age, weight, color, userId, id]
    );
    const upPet = { id, userId, name, spicies, breed, age, weight, color};
    return upPet;
}

async function getPetsByUserId(userId) {
    const verifyUser = await pool.query('SELECT name FROM pets WHERE user_id = ?', [userId]);
    if (verifyUser.length === 0) {
        return {message: "Nenhum pet encontrado para este usuário"};
    }

    return verifyUser[0];
}

async function getPetbyId(userId, id){
    const pet = await pool.query('SELECT * FROM pets WHERE id =? AND user_id = ?', [id, userId]);
    return pet[0];
}

async function deletePet(userId, id) {
    const verifyPet = await pool.query('SELECT id, user_id FROM pets WHERE user_id = ? AND id = ?', [userId, id]);

    if (verifyPet.length === 0) {
    throw new Error("Pet não encontrado");
}
 await pool.query('DELETE FROM pets WHERE user_id = ? AND id = ?', [userId, id]);
 return { message: "Pet removido com sucesso" };

}

export default { createPet, updatePet, getPetsByUserId, getPetbyId, deletePet };