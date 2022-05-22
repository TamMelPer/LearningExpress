const express = require( 'express' );

const {
    getPosts
} = require('../../controllers/pages/posts.controller')

const router = express.Router()

router.get('/', getPosts )

module.exports = router;