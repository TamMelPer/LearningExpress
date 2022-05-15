const path = require( 'path' )

const getHome = (req, res) => {
    // res.send('Hello from your friendly Express Server')
    // Note: send() is only to send HTML response ('Content-Type is set to 'text/html')
    res.sendFile( path.join( process.cwd(), 'public/index.html' ))
}

const getAbout = (req, res) => {
    // res.send('We will build out the "about" page here')
    res.sendFile( path.join( process.cwd(), 'public/about.html' ))
}

const getContact = (req, res) => {
    const contact = require(process.cwd() + '/public/contact.json')
    res.json(contact)
}

module.exports = {
    getHome,
    getAbout,
    getContact
}