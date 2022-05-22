const mongoose = require( 'mongoose' );

const postSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        minlength: 100,
        maxlength: 20000
    },
    claps: {
        type: Number,
        default: 0
    },
    imageUrl: {
        type: String,
    }
});

const Post = mongoose.model( 'Post', postSchema );

module.exports = Post;