import db from "../Config/db.js";
async function insert(user) {
    const inserted = await db.query("INSERT INTO users (us_username, us_email, us_password) VALUES (?,?,?)",
                                    [user.username, user.email, user.password]);
    return inserted;
}

async function getByLogin(login) {
    const [rows] = await db.query(`SELECT us_id, us_username, us_password, us_email 
                                    FROM users WHERE us_username = ?`, [login]);
    return rows[0];
}

async function getAll() {
    const [rows] = await db.query(`SELECT us_id, us_username,  us_email FROM users `);
    return rows;
}

export default {
    insert,
    getByLogin,
    getAll
}
