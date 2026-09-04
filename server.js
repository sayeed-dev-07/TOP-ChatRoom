const express = require('express');
const path = require('node:path');
const session = require("express-session");
const passport = require("passport");
const pgSession = require('connect-pg-simple')(session)
const { pool } = require('./db/pool')
const { postRouter } = require('./routers/postRoutes')

require('dotenv').config()

// all file imports 
const { indexRoutes } = require('./routers/indexRoutes')
require('./middlewares/passport')

const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use(
    session({
        store: new pgSession({
            pool: pool,
            tableName: 'sessions',
            createTableIfMissing: true
        }),
        secret: process.env.COOKIES_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 2 * 24 * 60 * 60 * 1000 }
    })
)
app.use(passport.session())
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5001


app.use('/', indexRoutes)
app.use('/app', postRouter)

app.listen(port, (error) => {
    if (error) {
        throw error;
    }
    console.log(`app listening on port ${port}!`);
});