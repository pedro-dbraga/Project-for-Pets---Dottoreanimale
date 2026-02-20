import pool from "../db.js";

async function createMember(familyId,userId, role, connection){

    const newMember = {familyId,userId,role};
    const [rows] = await connection.query('INSERT INTO members (familyId, userId, role) VALUES (?, ?, ?)',
    [newMember.familyId, newMember.userId, newMember.role] );

    if(rows.affectedRows ===0){
        throw new Error ("Usuario nao Cadastrado!");
    }
    return rows;
}


async function getMember(familyId, userId){

    const [rows] = await pool.query('SELECT name, role, xp FROM members WHERE familyId = ? AND userID = ?',
        [familyId, userId]);
    
    return rows;
}

async function listAllMembers(familyId){

        const [rows] = await pool.query('SELECT name, role, xp FROM members WHERE familyId = ?',
        [familyId]);
    
    return rows;
}

async function listAllFamliliesByMember(userId){

        const [rows] = await pool.query('SELECT f.id, f.name FROM family f INNER JOIN members m ON f.id = m.familyId WHERE m.userId = ?',
        [userId]);
    
    return rows;
}

async function changeRole(familyId, userId, adminrole, memberId, role){

    const [rows] =  await pool.query('UPDATE members m JOIN members admin ON admin.familyId = m.familyId SET role = ? WHERE m.familyID = ? AND m.userId = ? AND admin.userId = ? AND admin.role = ?',
    [role, familyId, memberId, userId, adminrole]);

    if(rows.affectedRows === 0){
        throw new Error ("Não foi possivel modificar o membro da familia");
    }
}

async function deleteMember(familyId, userId, memberId){
    const [rows] = await pool.query('DELETE memb FROM members memb LEFT JOIN members admin ON admin.familyId = memb.familyId AND admin.userId = ? AND admin.role = "admin" WHERE  memb.familyId = ? AND memb.userId = ?AND (memb.userId = ? OR admin.userId IS NOT NULL)',
    [userId, familyId,memberId, userId]);

    return rows;
}
async function FamilyEnded(familyId, connection){
    await connection.query('DELETE FROM members WHERE familyId = ?',[familyId])
}

async function memberXpGain(xpPoints, familyId, userId, connection){
    await connection.query('UPDATE members SET xp = xp + ? WHERE familyId = ? AND userId = ?',
        [xpPoints, familyId, userId]);
}
export default {createMember, getMember, listAllMembers, listAllFamliliesByMember, changeRole, deleteMember, FamilyEnded, memberXpGain};