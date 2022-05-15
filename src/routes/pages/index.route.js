const express = require( 'express' );

const {
    getHome,
    getAbout,
    getContact
} = require('../../controllers/pages/index.controller')

const router = express.Router()

router.get('/', getHome )

router.get('/about', getAbout)

router.get('/contact', getContact)

module.exports = router;