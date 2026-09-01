const { Router } = require('express')
const { getLogInControl, postLogInControl, getRegisterControl, postRegisterControl, getHomePage } = require('../controllers/indexController')
const { validationResult } = require('express-validator')
const { signUpValidator } = require('../middlewares/formValidation')


const indexRoutes = Router()

indexRoutes.get('/', getHomePage)
indexRoutes.get('/log-in', getLogInControl)
indexRoutes.post('/log-in', getLogInControl)
indexRoutes.get('/sign-up', getRegisterControl)
indexRoutes.post('/sign-up', signUpValidator,
    (req, res, next) => {
        
    }
    , postRegisterControl)

module.exports = { indexRoutes }