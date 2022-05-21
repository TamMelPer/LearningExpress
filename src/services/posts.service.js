const mongoose = require( 'mongoose');

const Post = mongoose.model('Post');

const getPosts = () => {
    return Post.find();
};

const createPost = ( blogPost) => {
    return Post.create(blogPost)
}

module.exports = {
    getPosts,
    createPost
}