import pool from "../db.js";


async function InviteMember(invite) {

    const [result] = await pool.query(`
        INSERT INTO invites (id, userId, familyId, email_convidado, role, token, expires_at) 
        SELECT  ?, ?, ?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 2 DAY)
        FROM members m
        WHERE m.familyId =? AND m.userId = ? AND m.role = "admin"`,
    [invite.id,  invite.userId, invite.familyId, invite.email, invite.role, invite.createToken, invite.familyId, invite.userId ]);
    
    return result;
}

async function acceptInvite(id, status,token, connection) {

    const [result] = await connection.query(`UPDATE invites i 
        INNER JOIN users u 
        ON u.email = i.email_convidado
        SET i.status = ?,
        i.accepted_at = IF(? = 'ACCEPTED', NOW(), i.accepted_at)
        WHERE i.id = ? 
        AND i.token = ? 
        AND i.status = "PENDING"
        AND i.expires_at > NOW()`
        , [ status, status, id, token]);

    return result;
}

async function getFamilyFromAInvite(id, connection){

    const [rows] = await connection.query(`SELECT familyId , role FROM invites WHERE id = ?`,
        [id]);
        console.log("model", rows);
    return rows;
}

async function DeleteInvite(id, userId, familyId){
    const [result] = pool.query('DELETE FROM invites WHERE id = ? AND userId = ? AND familyId = ?',
        [id, userId, familyId]
    )
    return result;
}

export default {InviteMember, acceptInvite, getFamilyFromAInvite, DeleteInvite};