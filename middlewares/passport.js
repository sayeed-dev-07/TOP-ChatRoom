const passport = require('passport')
const { Strategy } = require('passport-local')
const { pool } = require('../db/pool')
const { compare, hash } = require('bcryptjs')


passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username])
      const user = rows[0]
      if (!user) {
        return done(null, false, { message: 'Incorrect username!' })
      }
      const passwordMatch = await compare(password, user.password)
      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password" })
      }
      return done(null, user);
    } catch (error) {
      return done(err);
    }
  })
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
