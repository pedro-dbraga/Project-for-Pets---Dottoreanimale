import pool from "../db.js";


async function createTask(userId,familyId, petId, activity,status, when, connection) {
    
    await connection.query('INSERT INTO tasks (userId,familyId, petId, taskName, xp, status, taskday) VALUES (?,?,?,?,?,?,?)',
    [userId, familyId, petId, activity, xpPoints, status, when]);

}

async function getTask(taskId, userId) {

    const [rows] = await pool.query(`
        SELECT t.id, p.name, t.activity, t.status, t.taskday
        FROM tasks t
        INNER JOIN pets p
        ON t.petId = p.id
        WHERE t.id = ?
        AND ((p.familyId IS NULL AND p.userId = ?)
        OR (p.familyId IS NOT NUL AND EXISTS(
            SELECT 1
            FROM members m
            WHERE p.familyId = m.familyId
            AND m.userId = ?))
        )`,
        [taskId, userId, userId]);
    
    if (rows.length === 0) {
        throw new Error("Usuário não encontrado");
    }

    return rows;
}

async function getAllTasksByUser(userId) {

    const [rows] = await pool.query(`
        SELECT id, activity, status, taskday
        FROM tasks 
        WHERE userId = ?
        )`, 
        [userId]);
    
    return rows;

}

async function getAllTasksByFamily(userId, familyId){

    const [rows] = await pool.query(`
        SELECT t.id, t.activity, t.status, t.taskday
        FROM tasks t
        RIGHT JOIN members m
        ON t.familyId = m.familyId
        AND m.userId = ?
        WHERE familyId = ?
        )`, 
        [userId, familyId]);
    
    return rows;
    
}

async function updateTask(taskId, userId, activity, status, when) {

/* Task Concluida so pode ser modificada ate 24h depois de completa */
  
    const taskupdate = await pool.query(`
        UPDATE tasks t
        SET t.taskName = ?, t.status = ?, t.taskday = ? 
        WHERE t.id = ?
        AND ((t.familyId IS NULL AND t.userId = ?)
        OR (t.familyId IS NOT NULL 
            AND (t.userId = ? OR EXISTS(
                SELECT 1
                FROM members m
                WHERE t.familyId = m.familyId
                AND m.role = "admin"
                AND m.userId = ?)))
        )`,
        [activity, status, when, taskId, userId, userId, userId]);

}

async function deleteTask(taskId, userId) {
    
    const [rows] = await pool.query(`
        DELETE FROM  tasks t
        WHERE id = ?
        AND ((t.familyId IS NULL AND t.userId = ?)
            OR (t.familyId IS NOT NULL AND(
                t.userId = ? 
                OR EXISTS(
                    SELECT 1
                    FROM members m
                    WHERE t.familyId = m.familyId
                    AND m.userId = ?
                    AND m.role = "admin"
                )
            ))
        )`,
        [ taskId, userId, userId, userId]);

    if(rows.affectedRows === 0){
        throw new Error("Não foi possivel deletar a task.")
    }
}

export default { createTask, getTask, getAllTasksByUser, getAllTasksByFamily, updateTask, deleteTask };
