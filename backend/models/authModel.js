import pool from "../db.js";

async function checkIfUserIsAbleToCreateAPet(userId, familyId){
    const [rows] = await pool.query(`
        SELECT 1
        FROM users u
        LEFT JOIN members m
        ON u.id = m.userId
        AND m.familyId = ?
        AND m.role = "admin"
        WHERE (? IS NULL AND u.id = ?)
        OR (? IS NOT NULL AND m.userId = ?)`, 
        [familyId, familyId, userId, familyId, userId])
    
        if (rows.length === 0){
            throw new Error("Usuario não pode criar!")
        }
}

async function checkIfUserIsAbleToCreateVaccine(userId, petId){
    const [rows] = await pool.query(`
        SELECT 1
        FROM pets p
        LEFT JOIN members m
        ON m.familyId = p.familyId
        AND m.userId = ?
        WHERE p.id = ? 
        AND((p.familyId IS NULL AND p.userId = ?)
        OR (p.familyId IS NOT NULL AND m.role = "admin" AND m.userId = ?))
        `,
        [userId, petId, userId, userId])
        
    return rows;
}

async function checkIfUserIsAbleToCreateTask(){
    const [rows] = await pool.query(`
        SELECT 1
        FROM pets p
        LEFT JOIN members m
        ON m.familyId = p.familyId
        AND m.userId = ?
        WHERE p.id = ? 
        AND((p.familyId IS NULL AND p.userId = ?)
        OR (p.familyId IS NOT NULL AND m.userId = ?))
        `,
        [userId, petId, userId, userId])
        
    return rows;
}

export default {checkIfUserIsAbleToCreateAPet, checkIfUserIsAbleToCreateVaccine, checkIfUserIsAbleToCreateTask};