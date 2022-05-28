const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcrypt');

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

const NUM_ROUNDS = 10;

userSchema.pre( 'save', function(done) {
    const user = this;
    if(!user.isModified( 'password' )) {
        return done();
    }

    bcrypt.genSalt(NUM_ROUNDS, (err, salt) => {
        if(err) {
            return done(err);
        }
        bcrypt.hash(user.password, salt, (err, hashedPassword) => {
            if (err) {
                return done(err);
            }
            user.password = hashedPassword;
            done();
        })
    })
});

userSchema.method( 'checkPassword', function(password) {
    return new Promise((resolve, reject) => {
        const user = this;
        bcrypt.compare( password, user.password, (err, isMatch) => {
            if(err || !isMatch) {
                const error = new Error('Bad credentials')
                error.name = 'Bad Credentials';
                reject(error);
            }
            resolve();
        })
    })
})

const User = mongoose.model( 'User', userSchema );

module.exports = User;