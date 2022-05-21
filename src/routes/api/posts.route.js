const express = require('express');
const {getPosts, postPosts, getPostById, patchPost, deletePost, patchClapsforPosts } = require('../../controllers/api/posts.controller');

const router = express.Router();

router.get( '/', getPosts )
router.get( '/:id', getPostById )
router.post('/', postPosts )
router.patch('/:id', patchPost)
router.delete('/:id', deletePost)
router.patch('/:id/claps', patchClapsforPosts)

module.exports = router;