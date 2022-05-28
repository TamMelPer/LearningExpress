const CredentialsSchema = require('../models/Credentials.joi')
const mongoose = require('mongoose');
const { use } = require('bcrypt/promises');
const User = mongoose.model('User')

const userWithCredentialsExists = async (credentials) => {
    const {error,value} = CredentialsSchema.validate(credentials);
    if (error) {
        throw error
    }

    // Step 1: Test Matching Email
    const user = await User.findOne({
        email: credentials.email
    })

    if (!user) {
        const error = new Error('Invalid credentials');
        error.name = 'Bad Credentials';
        throw error
    } else {
        // Step 2: Test Matching Password
        try {
            await user.checkPassword(credentials.password)
        } catch (error) {
            throw error
        }

    }

    return user;

} 

module.exports = {
    userWithCredentialsExists
}