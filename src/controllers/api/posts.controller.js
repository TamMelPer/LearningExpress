const PostsSvc = require('../../services/posts.service');

// const getPosts = ( req, res ) => {
//     PostsSvc.getPosts()
//         .then((posts) => {
//             res.json({
//             status: 'success',
//             data: posts
//             })
//         .catch(error => {

//         })
    
//     })
// };

//async-await
const getPosts = async ( req, res ) => {
    try {
        const posts = await PostsSvc.getPosts()
        res.json({
            status: 'success',
            data: posts
        })
    } catch(error) {
        res.status(500).json({
            status: 'Error',
            message: 'Internal server error'
        })
    }
};

const postPosts = async ( req, res ) => {
    const post = req.body
    if(Object.keys(post).length === 0) {
        return res.status(400).json({
            status: 'Error',
            message: 'You must supply the details of the blog post in the request body'
        });
    }

    try {
        const updatedPost = await PostsSvc.createPost(post);
        res.status(201).json({
            status: 'Success',
            data: updatedPost
        });
    } catch(error) {
        console.log(error.name);
        if(error.name === 'ValidationError') {
            res.status(400).json({
            status: 'Error',
            message: error.message
        });
        } else {
        res.status(500).json({
            status: 'Error',
            message: 'Internal server error'
        })
        }
    }
};

module.exports = {
    getPosts, 
    postPosts
}