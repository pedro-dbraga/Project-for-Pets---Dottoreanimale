import pool from "../db.js";

async function createVacina(pet_id, name, date) {
    
    await pool.query('INSERT INTO vacinas (pet_id, name, date) VALUES (?, ?, ?)',[ pet_id, name, date]);

  return {message: 'Vacina criada com sucesso'};
}

async function getVacinasByPetId(pet_id) {
    const vacinas = await pool.query('SELECT name, date FROM vacinas WHERE pet_id = ?', [pet_id]);
    
    if (vacinas.length === 0) {
        throw new Error("Vacina não encontrada");
    }

    return vacinas[0];
}

async function getVacina(id, pet_id) {
    const vacina = await pool.query('SELECT name, data FROM vacinas WHERE id = ? AND pet_id = ?', [id, pet_id]);
    
    if (vacina[0].length === 0) {
        throw new Error("Vacina não encontrada");
    }
    return vacina[0];
}

async function updateVacina(id, pet_id, name, data) {
    const vacina = await pool.query('SELECT name FROM vacinas WHERE id = ? AND pet_id = ?', [id, pet_id]);
    if (vacina[0].length === 0) {
        throw new Error("Vacina não encontrada");
    }
    await pool.query('UPDATE vacinas SET name = ?, data = ? WHERE id = ? AND pet_id = ?', [name, data, id, pet_id]);
    return {message: 'Vacina atualizada com sucesso'};
}

async function deleteVacina(id, pet_id) {
    const vacina = await pool.query('SELECT name FROM vacinas WHERE id = ? AND pet_id = ?', [id, pet_id]);
    if (vacina[0].length === 0) {
        throw new Error("Vacina não encontrada");
    }
    await pool.query('DELETE FROM vacinas WHERE id = ? AND pet_id = ?', [id, pet_id]);
    return {message: 'Vacina removida com sucesso'};
}

export default { createVacina, getVacinasByPetId, getVacina, updateVacina, deleteVacina };