import pool from "../db.js";

async function createVaccine(petId, name, appliedAt, doseNumber, nextDoseAt) {
    
    const [rows ] = await pool.query(`
        INSERT INTO vaccines (petId, name, appliedAt, doseNumber, nextDoseAt)
        VALUES (?, ?, ?, ?, ?)`,
    [petId, name, appliedAt, doseNumber, nextDoseAt]);
    
    return rows;
}

async function getInfosFromVaccine(id, petId, userId) {
    
    const [vacina] = await pool.query(`
        SELECT v.name, v.appliedAt, v.doseNumber 
        FROM vaccines v 
        LEFT JOIN pets p
        WHERE v.id = ? 
        AND v.petId = ?
        AND ((p.familyId IS NULL AND p.userId = ?)
        OR(p.familyId IS NOT NULL AND EXISTS(
        SELECT 1
        FROM members m
        WHERE p.familyId = m.familyId
        AND m.userId = ?))
        )`, 
        [id, petId, userId, userId]);
    
    if (vacina.length === 0) {
        throw new Error("Vacina não encontrada");
    }
    return vacina;
}

async function ListAllVaccinesFromAPet(petId, userId) {
    const [vaccines] = await pool.query(`
        SELECT v.id, v.name, v.appliedAt, v.doseNumber 
        FROM vaccines v 
        RIGHT JOIN pets p
        ON v.petId = p.id
        WHERE v.petId = ?
        AND ((p.familyId IS NULL AND p.userId = ?)
        OR (p.familyId IS NOT NULL AND EXISTS(
            SELECT 1
            FROM members m
            WHERE p.familyId = m.familyId
            AND m.userId =? ))
        )`, [petId, userId, userId]);
    
    if (vaccines.length === 0) {
        throw new Error("Vacina não encontrada");
    }


    return vaccines;
}

async function whenVaccineWasCreated(id, petId, userId){

    const [rows] = await pool.query(`
        SELECT v.createdAt 
        FROM vaccines v 
        LEFT JOIN pets p
        WHERE v.id = ? 
        AND v.petId = ?
        AND ((p.familyId IS NULL AND p.userId = ?)
        OR(p.familyId IS NOT NULL AND EXISTS(
        SELECT 1
        FROM members m
        WHERE p.familyId = m.familyId
        AND m.userId = ?))
        )`, 
        [id, petId, userId, userId]);
    
    if (rows.length === 0) {
        throw new Error("Vacina não encontrada");
    }
    return rows;
}   

async function updateVacina(id, petId, name, appliedAt, doseNumber, userId) {

    await pool.query(`
        UPDATE vacinas v
        SET v.name = ?,
        appliedAt = ?,
        doseNumber = ?
        WHERE v.id = ?
        AND v.petId = ?
        AND EXISTS (
            SELECT 1
            FROM pets p
            WHERE p.id = v.petId
            AND (
                (p.familyId IS NULL AND p.userId = ?)
                OR 
                (p.familyId IS NOT NULL AND 
                    EXISTS(
                        SELECT 1
                        FROM members m
                        WHERE p.familyId = m.familyId
                        AND m.userId = ?
                        AND m.role = "admin"
                    )
                )
            ) 
        )
        `, 
        [name, appliedAt, doseNumber, id, petId, userId, userId]);
    
}


async function hardDeleteVacina(id, petId, userId) {

    const [rows] = await pool.query(`
        DELETE FROM vaccines v 
        WHERE id = ? 
        AND pet_id = ?
        AND createdAt >= NOW() - INTERVAL 1 DAY
        AND EXISTS (
            SELECT 1
            FROM pets p
            WHERE p.id = v.petId
            AND (
                (p.familyId IS NULL AND p.userId = ?)
                OR
                (p.familyId IS NOT NULL AND 
                    EXISTS(
                    SELECT 1
                    FROM members m
                    WHERE p.familyId = m.familyId
                    AND m.userId =?
                    AND role = "admin"
                    )
                )
            )
        )
        `,
         [id, petId, userId, userId]);
    
        return rows;
}

async function softDeleteVaccine(id, petId, userId){
    const [rows] = await pool.query(`
        UPDATE vaccines v
        SET status = "PENDDING_DELETE"
        WHERE id = ? 
        AND pet_id = ?
        AND createdAt < NOW() - INTERVAL 1 DAY
        AND EXISTS (
            SELECT 1
            FROM pets p
            WHERE p.id = v.petId
            AND (
                (p.familyId IS NULL AND p.userId = ?)
                OR
                (p.familyId IS NOT NULL AND 
                    EXISTS(
                    SELECT 1
                    FROM members m
                    WHERE p.familyId = m.familyId
                    AND m.userId =?
                    AND role = "admin"
                    )
                )
            )
        )
        `,
        [id, petId, userId, userId])
        return rows;
}

export default { createVaccine, getInfosFromVaccine, ListAllVaccinesFromAPet, updateVacina, hardDeleteVacina, softDeleteVaccine};