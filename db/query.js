const { pool } = require('./pool')

const createUser = async (username, password, first_name, last_name) => {
    await pool.query('INSERT INTO users(username, password, first_name, last_name) VALUES($1, $2, $3, $4)', [username, password, first_name, last_name])
}

const isUnique = async (name) => {
    const { rows } = await pool.query(
        'SELECT 1 FROM users WHERE username = $1',
        [name.toLowerCase()]
    );
    return rows.length === 0;
}

module.exports = { createUser, isUnique }