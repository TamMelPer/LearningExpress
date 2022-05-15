const express = require( 'express' );

//Express Application Object
const app = express();

app.get('/', ( req,res ) => {
    res.send('Hello from your friendly Express Server')
})

app.listen(3000, () => {
    console.log('Check http://localhost:3000/')
})
