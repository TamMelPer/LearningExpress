const getHttpError = ( message = 'Internal Server Error', statusCode = 500) => {
    const error = new Error (message);
    error.statusCode = statusCode;
    return error;
};

// this is not recommended
global.getHttpError = getHttpError;

module.exports = {
    getHttpError
}