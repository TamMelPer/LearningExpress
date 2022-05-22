// loads all the varibales in the .env file to process.env variable

require( 'dotenv').config();
require( './data/connect');
const path = require( 'path' );
const express = require( 'express' );
const indexPageRouter = require( './routes/pages/index.route')
const postsApiRouter = require( './routes/api/posts.route');
const req = require('express/lib/request');

//Express Application Object
const app = express();

app.set( 'views', path.join(process.cwd(), 'views') );
app.set( 'view engine', 'ejs' );

app.use( express.json()); // returns a middleware, called on every request, checks if the request has a body and if so, it makes it available on req.body
app.use( indexPageRouter );
app.use( '/api/posts', postsApiRouter )

app.use( (req,res) => {
    res.send('Page not found')
})

app.listen(3000, () => {
    console.log('Check http://localhost:3000/')
})
