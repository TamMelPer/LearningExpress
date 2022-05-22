const jwt = require('jsonwebtoken');
const { getHttpError } = require("../utils/error");

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return next(getHttpError('Token not sent', 400))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, claims) => {
        if(err) {
            return next(getHttpError('Bad Credentials', 401))
        }

        res.locals.claims = claims;
        next();
    })
}

const authorize = (allowedRoles) => {
    return (req, res, next) => {
        if (!res.locals.claims) {
           return next(getHttpError('Not authenticated', 401))
        }

        const role = res.locals.claims.role;

        if (!allowedRoles.includes(role)){
            return next(getHttpError('Forbidden', 403))
        }
        next();
    }
}

module.exports = {
    authenticate,
    authorize
}