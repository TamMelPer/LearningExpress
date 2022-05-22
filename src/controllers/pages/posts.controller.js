const PostsSvc = require( '../../services/posts.service')

const getPosts = async (req, res) => {
    try {
        const posts = await PostsSvc.getPosts()
        res.render( 'posts', {
            title: 'All blog posts | Stadium',
            activeLink: '/posts',
            posts: posts,
            error: null
        })
    } catch(error) {
        res.render( 'posts', {
            error: error,
            title: 'All blog posts | Stadium',
            activeLink: req.url
        })
    }
}

module.exports = {
    getPosts
}