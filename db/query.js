const { pool } = require('./pool')

const createUser = async (name, password) => {
    await pool.query('INSERT INTO users(username, password) VALUES($1, $2)', [name, password])
}

const isUnique = async (name) => {
    const { rows } = await pool.query(
        'SELECT 1 FROM users WHERE username = $1',
        [name.toLowerCase()]
    );
    return rows.length === 0;
}

module.exports = { createUser, isUnique }