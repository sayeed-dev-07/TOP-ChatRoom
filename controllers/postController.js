const { deletePost } = require('../db/query')
const deleteMessage = async (req, res, next) => {
    const { postId } = req.params;
    await deletePost(postId)
    res.redirect('/app')
}

module.exports = { deleteMessage }