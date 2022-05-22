const express = require('express');
const {login, register } = require('../../controllers/api/auth.controller');

const router = express.Router();

router.post( '/register', register )
router.get( '/:login', login )

module.exports = router;