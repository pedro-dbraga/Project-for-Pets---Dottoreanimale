import pool from "../db.js";


async function createFamily(familyId, name , connection) {

    const [rows] = await connection.query('INSERT INTO family (id, name) VALUES (?, ?)',
    [familyId, name]);

    if (rows.affectedRows === 0){
        throw new Error ("Não foi possivel criar a Familia!")
    }

}

async function getFamilyByUserId(userId) {
    const [rows] = await pool.query('SELECT f.id, f.name FROM family AS f JOIN members AS m ON f.id = m.familyId WHERE m.userId = ?',
    [userId]);
    return rows;
}

async function updateFamily(familyId, userId, name) {

    const [rows] = await pool.query('UPDATE family f INNER JOIN members m ON f.id = m.familyId AND m.userId =? AND m.role = "admin" SET f.name = ? WHERE id = ?',
    [userId, name, familyId]);


    return rows;
}

async function removeFamily(familyId, userId, connection) {
    
    await connection.query('UPDATE family f INNER JOIN members m ON f.id = m.familyId AND m.userID = ? AND m.role = "admin" SET status = "PENDING_DELETION", deletionRequestedAt = NOW()  WHERE id = ?', 
        [userId, familyId]);

}


export default { createFamily, updateFamily,removeFamily,getFamilyByUserId };