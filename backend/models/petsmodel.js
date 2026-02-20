import pool from "../db.js";


async function createPet(newPet){

    await pool.query(`
        INSERT INTO pets (id, userId, familyId, name, age, weight, breed, sex, species, sterelized) 
        VALUES(?,?,?,?,?,?,?,?,?,?)
        `,
    [newPet.id, newPet.userId, newPet.familyId, newPet.name, newPet.age, newPet.weight, newPet.breed, newPet.sex, newPet.species, newPet.sterelized, newPet.familyId, newPet.familyId, newPet.userId, newPet.familyId, newPet.userId]);
    
    return newPet;
}

async function getPetbyId(userId, petId){
    const [rows] = await pool.query(`
        SELECT p.id, p.name, p.age, p.weight, p.breed, p.sex, p.species, p.sterelized, p.xp 
        FROM pets p 
        LEFT JOIN members m 
        ON m.familyId = p.familyId 
        AND m.userId = ? 
        WHERE p.id = ?
        AND (p.userId = ? 
        OR m.userId IS NOT NULL)`
        , [petId, userId, userId]);

    return rows;
}

async function ListAllPeTs(userId) {
    const [rows] = await pool.query(`
        SELECT id, name, xp 
        FROM pets
        WHERE userId = ?
        AND familyId IS NULL`, 
        [userId]);
    
    if (rows.length === 0) {
        return {message: "Nenhum pet encontrado para este usuário"};
    }

    return rows;
}

async function ListAllPetsFromAFamily(userId, familyId) {
    const [rows] = await pool.query(`
        SELECT p.id, p.name, p.xp 
        FROM pets p 
        INNER JOIN members m 
        ON m.familyId = p.familyId 
        WHERE m.userId = ? 
        AND p.familyId =?`, 
        [userId, familyId]);
    
    if (rows.length === 0) {
        return {message: "Nenhum pet encontrado para este usuário"};
    }

    return rows;
}

async function updatePet( petId, userId,  age, weight, breed, sex, species, sterelized) {

    const [result] = await pool.query(`
        UPDATE pets p
        SET p.age = ?, 
        p.weight = ?, 
        p.breed = ?, 
        p.sex = ?, 
        p.species = ?, 
        p.sterelized= ? 
        WHERE  p.id = ?
        AND ( (p.userId = ? AND p.familyId IS NULL)
            OR (p.familyId IS NOT NULL AND EXISTS (
                SELECT 1
                FROM members m
                WHERE p.familyId = m.familyId 
                AND m.userId = ?
                AND m.role = "admin"
            ))
        )`,
        [ age, weight, breed, sex, species, sterelized, petId, userId, userId]
    );

    if (result.affectedRows === 0) {
        throw new Error("Não foi possivel modificar o Pet!");
    }

}

async function changePetName(petId, userId, name) {

    const [result] = await pool.query(
        `UPDATE pets p
        SET  p.name = ? 
        WHERE p.id = ? 
        AND ((p.userId = ? AND p.familyId IS NULL)
            OR (p.familyId IS NOT NULL AND EXISTS(
                SELECT 1
                FROM members m
                WHERE p.familyId = m.familyId
                AND m.userId = ?
                AND m.role = "admin"
            ))
        );
        `,
        [ userId, name, petId, userId]
    );

    if(result.affectedRows === 0){
        throw new Error("Não foi possivel modificar o Pet!");
    }
}

async function PutPetInAFamily(petId, userId, familyId){

    const [result] = await pool.query(`
        UPDATE pets p
        SET p.familyId = ? 
        WHERE p.userId = ? 
        AND p.id = ?
        AND EXISTS (
            SELECT 1
            FROM members m
            HWERE m.familyId = ?
            AND m.userId = ?
        )`,
        [familyId, userId, petId, familyId, userId]);
    
    if(result.affectedRows === 0){
        throw new Error("Não foi possivel modificar o pet! Informaçõe incorretas.")
    }
}

async function PenddingDeletePet(userId) {

    const [result] = await pool.query(`
        UPDATE pets p 
        SET status = "PENDING_DELETION" 
        WHERE ((p.familyId IS NULL AND p.userId = ?)
        OR (p.familyId IS NOT NULL AND EXISTS(
            SELECT 1
            FROM members m
            WHERE p.familyId = m.familyId
            AND m.userId = ?
            AND m.role = "admin"  
        ))
        )
        `, 
        [userId,userId ]);

    if(result.affectedRows === 0){
        throw new Error("Não foi possivel remover o pet!");
    }
}

async function deletePet(userId, petId) {

    const [result] = await pool.query(`
        DELETE p 
        FROM pets p
        WHERE p.id = ?
        AND ((p.familyId IS NULL AND p.userId = ?)
        OR (p.familyId IS NOT NULL AND EXISTS(
            SELECT 1
            FROM members m
            WHERE p.familyId = m.familyId
            AND m.userId = ?
            AND m.role = "admin"  
        ))
        )
        `, 
        [petId, userId,userId ]);

    if(result.affectedRows === 0){
        throw new Error("Não foi possivel remover o pet!");
    }
}

async function HasDependencies(petId){
    const [rows] = await pool.query(`
        SELECT EXISTS (
            SELECT 1 FROM vaccines v WHERE v.petId = ?
        ) AS hasVaccines`,
        [petId]);
    return rows[0].hasVaccines;

}

async function petXpGain(xpPoints, petId, connection){
    await connection.query('UPDATE pets SET xp = xp + ? WHERE  id = ?',
        [xpPoints, petId]);
}

export default { createPet, getPetbyId, ListAllPeTs, ListAllPetsFromAFamily, updatePet, changePetName, PutPetInAFamily, PenddingDeletePet, deletePet, HasDependencies, petXpGain};
