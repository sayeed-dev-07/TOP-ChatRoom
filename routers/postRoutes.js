const { Router } = require('express')
const { deleteMessage } = require('../controllers/postController')

const postRouter = Router()

postRouter.post('/:postId/delete', deleteMessage)


module.exports = { postRouter }