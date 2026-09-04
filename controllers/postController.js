const { deletePost, addNewMessage } = require('../db/query')
const { matchedData } = require('express-validator')
const { streamUpload } = require('../utils/cloudinary')

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
    let img_link = '';
    if (req.file) {
        const result = await streamUpload(req.file.buffer);
        img_link = result.secure_url;
    }
    const dataobj = {
        title, message, img_link, user_id
    }
    console.log(dataobj);
    await addNewMessage(dataobj)
    res.redirect('/app')
}


module.exports = { deleteMessage, getNewMessage, postNewMessage }