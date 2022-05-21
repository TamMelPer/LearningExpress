const mongoose = require( 'mongoose');

const Post = mongoose.model('Post');

const getPosts = () => {
    return Post.find();
};

const getPostById = (id) => {
    return Post.findById(id);
}

const createPost = ( blogPost) => {
    return Post.create(blogPost)
}

const updatePost = ( id, blogPost) => {
    // return Post.findByIdAndUpdate(id, blogPost, {
    //     returnOriginal: false,
    //     runValidators: true
    // })
    return Post.findByIdAndUpdate(id, blogPost)
}

const deletePost = (id) => {
    return Post.findByIdAndRemove(id)
}

const addClaps = (id, numClaps) => {
    return Post.findByIdAndUpdate( id, {
        $inc: {
            claps: numClaps
        }
    })
}


module.exports = {
    getPosts,
    createPost,
    getPostById,
    updatePost,
    deletePost,
    addClaps
}