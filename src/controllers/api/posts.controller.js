const PostsSvc = require('../../services/posts.service');
const { getHttpError } = require('../../utils/error')
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
        return next(getHttpError())
        // const err = new Error('Internal Server Error');
        // err.statusCode = 500;
        // next(err);
        // res.status(500).json({
        //     status: 'Error',
        //     message: 'Internal server error'
        // })
    }
};

const getPostById = async ( req, res, next ) => {
    const { id } = req.params;
    try {
        const post = await PostsSvc.getPostById(id)
        if (!post) { // post is null
            return next(getHttpError('A post with the given id does not exist', 404))
            // return res.status(404).json({
            //     status: 'Error',
            //     message: 'A post with the given id does not exist'
            // })
        }
        res.json({
            status: 'success',
            data: post
        })
    } catch(error) {
        if(error.name === "CastError") {
            return next(getHttpError('A post with the given id does not exist', 404))
            // return res.status(404).json({
            //     status: 'Error',
            //     message: 'A post with the given id does not exist'
            // })
        }
        res.status(500).json({
            status: 'Error',
            message: 'Internal server error'
        })
    }
};

const postPosts = async ( req, res, next ) => {
    const post = req.body
    if(Object.keys(post).length === 0) {
        return next(getHttpError('You must supply the details of the blog post in the request body', 400))

        // return res.status(400).json({
        //     status: 'Error',
        //     message: 'You must supply the details of the blog post in the request body'
        // });
    }
    try {
        const updatedPost = await PostsSvc.createPost(post);
        res.status(201).json({
            status: 'Success',
            data: updatedPost
        });
    } catch(error) {
        if(error.name === 'ValidationError') {
        return next(getHttpError(error.message, 400))
            
        //     res.status(400).json({
        //     status: 'Error',
        //     message: error.message
        // });
        } else {
            return next(getHttpError())
        // res.status(500).json({
        //     status: 'Error',
        //     message: 'Internal server error'
        // })
        }
    }
};

const patchPost = async ( req, res, next ) => {
    const {id} = req.params;
    const post = req.body
    if(Object.keys(post).length === 0) {
        return next(getHttpError('You must supply the field(s) you want to update', 400))

        // return res.status(400).json({
        //     status: 'Error',
        //     message: 'You must supply the field(s) you want to update'
        // });
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
        return next(getHttpError(error.message, 400))
        //     res.status(400).json({
        //     status: 'Error',
        //     message: error.message
        // });
        } else {
            return next(getHttpError())

        // res.status(500).json({
        //     status: 'Error',
        //     message: 'Internal server error'
        // })
        }
    }
};

const deletePost = async (req, res, next) => {
    const {id} = req.params;
    try {
        const deletedPost = await PostsSvc.deletePost(id);
        if (!deletedPost) {
            return next(getHttpError('A post with the given id does not exist', 404))
        //     return res.status(404).json({
        //     status: 'Error',
        //     message: 'A post with the given id does not exist'
        // });
        } else {
            res.status(204).json();
        }
    } catch(error) {
            if(error.name === "CastError") {
            return next(getHttpError('A post with the given id does not exist', 404))

            // return res.status(404).json({
            //     status: 'Error',
            //     message: 'A post with the given id does not exist'
            // })
            } else {
                return next(getHttpError())
            // res.status(500).json({
            // status: 'Error',
            // message: 'Internal server error'
            // })
            }
    }
}

const patchClapsforPosts = async (req,res, next) => {
    const {id} = req.params;
    const {num} = req.query;
    const numClaps = parseInt(num)
    if(!num || isNaN(numClaps) || numClaps < 0) {
        return next(getHttpError('Please supply a num query string param with a positive integer', 400))
        // return res.json({
        //     status: 'Error',
        //     message: "Please supply a num query string param with a positive integer"
        // })
    }
    try {
        const updatedPost = await PostsSvc.addClaps(id, numClaps);
        return res.status(200).json({
            status: 'Success',
            data: updatedPost
        });
    } catch(error) {
        return next(getHttpError())
        // return res.status(500).json({
        //     status: 'Error',
        //     message: 'Internal server error'
        //     })

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