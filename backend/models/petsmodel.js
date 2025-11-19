import pool from "../db.js";
import { v4 as uuidv4 } from "uuid";


async function createPet(userId, name, img, age, weight, breed, sex, species, sterelized ){
    const sterelizedValue = sterelized === true || sterelized === "true" ? 1 : 0;
    const newPet = { id: uuidv4(), userId, name, img, age, weight, breed, sex, species, sterelize:sterelizedValue };

    await pool.query('INSERT INTO pets (id, user_id, name,img,age, weight, breed, sex, species, sterelized) VALUES (?,?,?,?,?,?,?,?,?,?)',
    [newPet.id, newPet.userId, newPet.name,newPet.img, newPet.age, newPet.weight, newPet.breed, newPet.sex, newPet.species, newPet.sterelize]);
    return newPet;
}
async function updatePet( petId, userId,  age, weight, breed, sex, species, sterelized) {

    const verifyPet = await pool.query('SELECT id, user_id FROM pets WHERE user_id = ? AND id = ?', [userId, petId]);
    if (verifyPet.length === 0) {
        throw new Error("Pet não encontrado");
    }

     await pool.query(
        'UPDATE pets SET   age = ?, weight = ?, breed = ?, sex = ?, species = ?, sterelized= ? WHERE user_id = ? AND id = ?',
        [ age, weight, breed, sex, species, sterelized, userId, petId]
    );
    const upPet = { petId, userId,  age, weight, breed, sex, species, sterelized};
    return upPet;
}

async function getPetsByUserId(userId) {
    const verifyUser = await pool.query('SELECT id,name FROM pets WHERE user_id = ?', [userId]);
    if (verifyUser.length === 0) {
        return {message: "Nenhum pet encontrado para este usuário"};
    }

    return verifyUser[0];
}

async function getPetbyId(userId, id){
    const [rows] = await pool.query('SELECT * FROM pets WHERE id =? AND user_id = ?', [id, userId]);
    return rows[0];
}

async function deletePet(userId, id) {
    const verifyPet = await pool.query('SELECT id, user_id FROM pets WHERE user_id = ? AND id = ?', [userId, id]);

    if (verifyPet.length === 0) {
    throw new Error("Pet não encontrado");
}
 await pool.query('DELETE FROM pets WHERE user_id = ? AND id = ?', [userId, id]);
 return { message: "Pet removido com sucesso" };

}
async function changePetName(petId, userId, name) {
    const verifyPet = await pool.query('SELECT id, user_id FROM pets WHERE user_id = ? AND id = ?', [userId, petId]);
    if (verifyPet.length === 0) {
        throw new Error("Pet não encontrado");
    }

     await pool.query(
        'UPDATE pets SET  name = ? WHERE user_id = ? AND id = ?',
        [ name, userId, petId]
    );
    const upName = { petId, userId,  name};
    return upName;
}
export default { createPet, updatePet, getPetsByUserId, getPetbyId, deletePet, changePetName };

