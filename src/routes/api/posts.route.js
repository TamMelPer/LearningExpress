const express = require('express');
const {getPosts, postPosts, getPostById, patchPost, deletePost, patchClapsforPosts } = require('../../controllers/api/posts.controller');
const { authenticate, authorize } = require('../../middleware/auth')
const cahce = require('../../middleware/cache');
const router = express.Router();

router.get( '/', getPosts )
router.get('/:id', cahce('posts', 'id'), getPostById)
router.get( '/:id', getPostById )
router.post('/', authenticate, postPosts )
router.patch('/:id', authenticate, patchPost)
router.delete('/:id', authenticate, authorize(['admin']), deletePost)
router.patch('/:id/claps', authenticate, patchClapsforPosts)

module.exports = router;