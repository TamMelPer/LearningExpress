// loads all the varibales in the .env file to process.env variable

require( 'dotenv').config();
require( './data/connect');
const path = require( 'path' );
const express = require( 'express' );
const cors = require('cors');
const morgan = require('morgan');
// const logger = require( './middleware/logger')
const indexPageRouter = require( './routes/pages/index.route')
const postsPageRouter = require( './routes/pages/posts.route');
const postsApiRouter = require( './routes/api/posts.route');


//Express Application Object
const app = express();

app.set( 'views', path.join(process.cwd(), 'views') );
app.set( 'view engine', 'ejs' );

app.use(morgan('combined'))
// app.use(logger);
// allow only from example.com
app.use( cors({
    origin: 'http://example.com',
    optionsSuccessStatus: 200
}
));


// setup static file server to check the public folder for a page matching he URL requested
app.use( express.static(path.join(process.cwd(), 'public')))

app.use( express.json()); // returns a middleware, called on every request, checks if the request has a body and if so, it makes it available on req.body
app.use( indexPageRouter );
app.use( '/posts', postsPageRouter)
app.use( '/api/posts', postsApiRouter )

app.use( (req,res) => {
    res.send('Page not found')
})

app.listen(3000, () => {
    console.log('Check http://localhost:3000/')
})
