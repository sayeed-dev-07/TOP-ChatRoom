const { Router } = require('express')
const { getLogInControl, postLogInControl, getRegisterControl, postRegisterControl, getHomePage } = require('../controllers/indexController')
const { validationResult, matchedData } = require('express-validator')
const { signUpValidator } = require('../middlewares/formValidation')
const { isLoggedIn, isAdmin, isMember } = require('../middlewares/auth')

const indexRoutes = Router()

indexRoutes.get('/chat', isLoggedIn, (req, res) => {
    res.send('Hello u are logged in just fine')
})
indexRoutes.get('/admin', isAdmin, (req, res) => {
    res.send('Hello u are logged in just fine, HELLO ADMIN')
})
indexRoutes.get('/member', isMember, (req, res) => {
    res.send('Hello u are logged in just fine, HELLO MEMBER')
})
indexRoutes.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});

indexRoutes.get('/', getHomePage)
indexRoutes.get('/log-in', getLogInControl)
indexRoutes.post('/log-in', postLogInControl)
indexRoutes.get('/sign-up', getRegisterControl)
indexRoutes.post('/sign-up', signUpValidator,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const user = req.body
            return res.status(400).render('signup', {
                user: user,
                errors: errors.mapped()
            })
        }
        next()
    }
    , postRegisterControl)


module.exports = { indexRoutes }