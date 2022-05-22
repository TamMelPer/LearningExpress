const CredentialsSchema = require('../models/Credentials.joi')
const mongoose = require('mongoose')
const User = mongoose.model('User')

const userWithCredentialsExists = async (credentials) => {
    const {error,value} = CredentialsSchema.validate(credentials);
    if (error) {
        throw error
    }

    const user = await User.findOne(credentials)

    if (!user) {
        const error = new Error('Invalid credentials');
        error.name = 'Bad Credentials';
        throw error
    }

    return user;

} 

module.exports = {
    userWithCredentialsExists
}