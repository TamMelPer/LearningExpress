const express = require( 'express' );
const indexPageRouter = require( './routes/pages/index.route')

//Express Application Object
const app = express();

app.use( indexPageRouter );

app.use( (req,res) => {
    res.send('Page not found')
})

app.listen(3000, () => {
    console.log('Check http://localhost:3000/')
})
