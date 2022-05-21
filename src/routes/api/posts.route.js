const express = require('express');
const {getPosts, postPosts } = require('../../controllers/api/posts.controller');

const router = express.Router();

router.get( '/', getPosts )
router.post('/', postPosts )

module.exports = router;