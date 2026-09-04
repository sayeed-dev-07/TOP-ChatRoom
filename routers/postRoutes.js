const { Router } = require('express')
const { deleteMessage, getNewMessage, postNewMessage } = require('../controllers/postController')
const { isAdmin, isLoggedIn } = require('../middlewares/auth')
const { messageValidator } = require('../middlewares/formValidation')
const { validationResult } = require('express-validator')
const { upload } = require('../middlewares/upload')

const postRouter = Router()

postRouter.post('/:postId/delete', isAdmin, deleteMessage)
postRouter.get('/new-message', isLoggedIn, getNewMessage)
postRouter.post('/new-message', isLoggedIn, upload.single('image'), messageValidator, (req, res, next) => {
    const errors = validationResult(req);
    const is_member = req.user.is_member;
    if (!errors.isEmpty()) {
        return res.status(400).render('message', {
            is_member,
            errors: errors.mapped(),
            oldInput: req.body
        })
    }
    next()
},
    postNewMessage
)



module.exports = { postRouter }