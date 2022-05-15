const express = require( 'express' );
const path = require( 'path' )
const contact = require(process.cwd() + '/public/contact.json')

const router = express.Router()

router.get('/', ( req,res ) => {
    // res.send('Hello from your friendly Express Server')
    // Note: send() is only to send HTML response ('Content-Type is set to 'text/html')
    res.sendFile( path.join( process.cwd(), 'public/index.html' ))
})

router.get('/about', (req,res) => {
    // res.send('We will build out the "about" page here')
    res.sendFile( path.join( process.cwd(), 'public/about.html' ))
})

router.get('/contact', (req,res) => {
    res.json(contact)
})

module.exports = router;