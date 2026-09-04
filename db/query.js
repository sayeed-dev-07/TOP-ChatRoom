const { pool } = require('./pool')

const createUser = async (username, password, first_name, last_name, is_admin, is_member) => {
    await pool.query('INSERT INTO users(username, password, first_name, last_name, is_admin, is_member) VALUES($1, $2, $3, $4, $5, $6)', [username, password, first_name, last_name, is_admin, is_member])
}

const isUnique = async (name) => {
    const { rows } = await pool.query(
        'SELECT 1 FROM users WHERE LOWER(username) = $1',
        [name.toLowerCase()]
    );
    return rows.length === 0;
}

const getMessages = async () => {
    const { rows } = await pool.query('SELECT * FROM messages;')
    return rows;
}

const getAllMessagesWithAuthors = async () => {
    const { rows } = await pool.query(`
        SELECT 
            messages.id, 
            messages.title, 
            messages.message, 
            messages.added_at, 
            messages.img_link, 
            users.username, 
            users.first_name 
        FROM messages 
        JOIN users ON messages.user_id = users.id
        ORDER BY messages.id DESC;
    `);

    return rows;
}

const beAdmin = async (userId) => {
    await pool.query('UPDATE users SET is_admin = true WHERE id = $1', [userId])
}
const beMember = async (userId) => {
    await pool.query('UPDATE users SET is_member = true WHERE id = $1', [userId])
}

module.exports = { createUser, isUnique, getMessages, getAllMessagesWithAuthors, beAdmin, beMember }