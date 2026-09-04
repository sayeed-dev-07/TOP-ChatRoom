const { deletePost, addNewMessage } = require('../db/query')
const { matchedData } = require('express-validator')

const deleteMessage = async (req, res, next) => {
    const { postId } = req.params;
    await deletePost(postId)
    res.redirect('/app')
}

const getNewMessage = (req, res) => {
    const is_member = req.user.is_member
    res.render('message', {
        is_member
    })
}
const postNewMessage = async (req, res) => {
    const user_id = req.user.id
    const data = matchedData(req);
    const { title, message } = data;
    const dataobj = {
        title, message, img_link: '', user_id
    }
    console.log(data);
    await addNewMessage(dataobj)
    res.redirect('/app')
}


module.exports = { deleteMessage, getNewMessage, postNewMessage }