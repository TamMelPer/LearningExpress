const mongoose = require( 'mongoose');

//set up models
require( '../models/Post');

const { NODE_ENV, DB_HOST, DB_PORT, DB_NAME } = process.env;

let connectionString;

if (NODE_ENV === 'development' ) {
   connectionString =  `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
   mongoose.connect( connectionString)
        .then(() => {
            console.log(`Connected to the DB`)
        })
        .catch((error) => {
            console.error( error.message)
        });

} else if (NODE_ENV === 'production') {
    // ..some other connection string
}
