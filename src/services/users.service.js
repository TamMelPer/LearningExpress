const mongoose = require( 'mongoose');

const User = mongoose.model('User');

const createUser = ( user) => {
    return User.create(user)
}


module.exports = {
    createUser
}