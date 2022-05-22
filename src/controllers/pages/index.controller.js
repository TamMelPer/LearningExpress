const path = require( 'path' )
const { getContactList } = require ('../../services/contact.service')

const getHome = (req, res) => {
    // res.send('Hello from your friendly Express Server')
    // Note: send() is only to send HTML response ('Content-Type is set to 'text/html')
    // res.sendFile( path.join( process.cwd(), 'public/index.html' ))
    res.render('index', {
        title: 'Stadium',
        activeLink: req.url
    })
}

const getAbout = (req, res) => {
    // res.send('We will build out the "about" page here')
    // res.sendFile( path.join( process.cwd(), 'public/about.html' ))
    res.render( 'about', {
        title: 'About | Stadium',
        activeLink: req.url

    })
}

const getContact = (req, res) => {
    const contact = require(process.cwd() + '/public/contact.json')
    res.json(getContactList())
}

module.exports = {
    getHome,
    getAbout,
    getContact
}