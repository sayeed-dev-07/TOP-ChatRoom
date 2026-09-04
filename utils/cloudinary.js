const cloudinary = require('cloudinary').v2;
require('dotenv').config()

const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: 'club_room_posts' },
            (error, result) => {
                if (result) resolve(result);
                else reject(error);
            }
        );

        stream.end(buffer);
    });
};

module.exports = { streamUpload };