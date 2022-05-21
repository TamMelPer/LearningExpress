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

const getPostById = async ( req, res ) => {
    const { id } = req.params;
    try {
        const post = await PostsSvc.getPostById(id)
        if (!post) { // post is null
            return res.status(404).json({
                status: 'Error',
                message: 'A post with the given id does not exist'
            })
        }
        res.json({
            status: 'success',
            data: post
        })
    } catch(error) {
        if(error.name === "CastError") {
            return res.status(404).json({
                status: 'Error',
                message: 'A post with the given id does not exist'
            })
        }
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

const patchPost = async ( req, res ) => {
    const {id} = req.params;
    const post = req.body
    if(Object.keys(post).length === 0) {
        return res.status(400).json({
            status: 'Error',
            message: 'You must supply the field(s) you want to update'
        });
    }

    try {
        const updatedPost = await PostsSvc.updatePost(id,post);
        res.status(200).json({
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

const deletePost = async (req, res) => {
    const {id} = req.params;
    try {
        const deletedPost = await PostsSvc.deletePost(id);
        if (!deletedPost) {
            return res.status(404).json({
            status: 'Error',
            message: 'A post with the given id does not exist'
        });
        } else {
            res.status(204).json();
        }
    } catch(error) {
            if(error.name === "CastError") {
            return res.status(404).json({
                status: 'Error',
                message: 'A post with the given id does not exist'
            })
            } else {
            res.status(500).json({
            status: 'Error',
            message: 'Internal server error'
            })
            }
    }
}

const patchClapsforPosts = async (req,res) => {
    const {id} = req.params;
    const {num} = req.query;
    const numClaps = parseInt(num)
    if(!num || isNaN(numClaps) || numClaps < 0) {
        return res.json({
            status: 'Error',
            message: "Please supply a num query string param with a positive integer"
        })
    }
    try {
        const updatedPost = await PostsSvc.addClaps(id, numClaps);
        return res.status(200).json({
            status: 'Success',
            data: updatedPost
        });
    } catch(error) {
        return res.status(500).json({
            status: 'Error',
            message: 'Internal server error'
            })

    }
    

}

module.exports = {
    getPosts, 
    postPosts,
    getPostById,
    patchPost,
    deletePost,
    patchClapsforPosts
}