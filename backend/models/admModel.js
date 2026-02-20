import { v4 as uuidv4 } from "uuid";
import pool from "../db.js";

async function CreateAdmin(name, email, hashedPassword) {
    const [verifyEmail] = await pool.query('SELECT email FROM users WHERE email = ?', [email]);
    if (verifyEmail.length > 0) {
        throw new Error("Email já cadastrado");
    }
    
    const newAdmin = { id: uuidv4(), name, email, password: hashedPassword, is_admin: true };

    await pool.query('INSERT INTO users (id, name, email, password, is_admin) VALUES (?, ?, ?, ?, ?)',
    [newAdmin.id, newAdmin.name, newAdmin.email, newAdmin.password, newAdmin.is_admin]);

    return newAdmin;
}

async function MetricPetBySpecies() {
    const [rows] = await pool.query(`SELECT species, COUNT(*) AS "Pet Count" FROM pets GROUP BY species;`)
    return rows;
}
async function MetricSterelized() {
    const [rows] = await pool.query(`SELECT sterelized, COUNT(*) AS "Nº of Pets" FROM pets GROUP BY sterelized;`)
    return rows;
}

async function MetricPetByBreed() {
    const [rows] = await pool.query(`SELECT species, breed, COUNT(breed)  FROM pets GROUP BY breed Order BY breed desc;`)
    return rows;
}
export default { CreateAdmin, MetricPetBySpecies, MetricSterelized, MetricPetByBreed };