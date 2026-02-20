import pool from "../db.js";


async function createUser(user) {
    
    const [ result ] = await pool.query('INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?) ',
    [user.id, user.name, user.email, user.password]);
    
    if (result.affectedRows === 0){
        throw new Rrror('INSERT_FAILED');
    }
}

async function getUserById(id) {
    const [rows] = await pool.query('SELECT email, name, xp FROM users WHERE id = ?', [id]);


    console.log(rows);
    return rows || null;
}

async function updateUser(id, userValues) {
    const fields = [];
    const values = [];

  for (const key in userValues) {
    fields.push(`${key} = ?`);
    values.push(userValues[key]);
  }

  if (fields.length === 0) {
    throw new Error('NO_FIELDS_TO_UPDATE');
  }

  const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

  values.push(id);

  const [result] = await pool.query(sql, values);
  return result;
}


async function newPassword(userId, hashedPassword) {

    const [result] = await pool.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, userId]);
    
    return  result;
}

async function deleteUser(id) {
    

    const [rows] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
    return rows;
}

async function userXpGain(xpPoints, userId, connection){

  await connection.query(`UPDATE users SET xp = xp + ? WHERE id = ?`,
        [xpPoints, userId]);
        
}


export  default { createUser, getUserById, updateUser, deleteUser , newPassword, userXpGain};