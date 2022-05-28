const mongoose = require( 'mongoose' );

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: [ 'admin', 'user']
    }
});

const emailPattern = /^[A-Za-z\._]+@example\.com$/;
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

userSchema.path( 'email').validate(value => {
    return emailPattern.test(value)
}, 'Email `{VALUE}` is not a valid email address from example.com domain')

userSchema.path( 'password').validate(value => {
    return passwordPattern.test(value)
}, 'Password must contain at least 8 characters, one uppercase, one lowercase, a digit and a special character.')


const User = mongoose.model( 'User', userSchema );

module.exports = User;