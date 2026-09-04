const { Router } = require('express')
const { getLogInControl, postLogInControl, getRegisterControl, postRegisterControl, getHomePage, getAdminForm, postAdminForm, getMemberForm, postMemberForm } = require('../controllers/indexController')
const { validationResult } = require('express-validator')
const { signUpValidator } = require('../middlewares/formValidation')
const { isLoggedIn, isMember } = require('../middlewares/auth')
const { getAllMessagesWithAuthors } = require('../db/query')

const indexRoutes = Router()

// if user already logged in redirect him to main app 
indexRoutes.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect('/app');
    }
    next()
}, getHomePage);

indexRoutes.get('/app', isLoggedIn, async (req, res) => {
    const messages = await getAllMessagesWithAuthors()
    res.render('chat', {
        user: req.user,
        messages
    })
})
indexRoutes.get('/admin', getAdminForm)
indexRoutes.post('/admin', postAdminForm)
indexRoutes.get('/member', getMemberForm)
indexRoutes.post('/member', postMemberForm)
indexRoutes.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});


indexRoutes.get('/log-in', getLogInControl)
indexRoutes.post('/log-in',
    (req, res, next) => {
        next()
    }
    , postLogInControl)
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



indexRoutes.get('/:splash', (req, res, next) => {
    res.send('nothing found')
})
module.exports = { indexRoutes }