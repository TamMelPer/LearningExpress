const UserSvc = require('../../services/users.service')
const CredentialsSchema = require('../../models/Credentials.joi');
const { getHome } = require('../pages/index.controller');
const { getHttpError } = require('../../utils/error');

const register = async (req, res, next) => {
    const user = req.body;
    
    if(Object.keys(user).length === 0) {
        return next(getHttpError('You must supply the details of the new user in the request body', 400))
    }
    try {
        //Any other role sent should be disallowed
        user.role = 'user';

        const updatedUser = (await UserSvc.createUser( user )).toObject();
        const userToSend = { name: updatedUser.name, email: updatedUser.email}
        return res.status( 201 ).json({
            status: 'success',
            data: userToSend
        });
    } catch( error ) {
        if( error.name === 'ValidationError' ) {
            return next( getHttpError( error.message, 400 ) );
        } else if ( error.name === 'MongoServerError') {
            return next( getHttpError( 'Email ID already exists', 409 ) );
        } else {
            return next( getHttpError() );
        }
    }
}

const login = async (req, res, next) => {
    const credentials = req.body;
    
    if(Object.keys(credentials).length === 0) {
        return next(getHttpError('You must supply the credentials in the request body', 400))
    }

    const {error,value} = CredentialsSchema.validate(credentials);

    if (error) {
        return next(getHttpError(error.message, 400))
    }

}

module.exports = {
    register,
    login
}
