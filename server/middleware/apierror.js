const mongoose = require('mongoose');
const httpStatus = require('http-status');


class ApiError extends Error {
    constructor(statusCode, message){
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
// class for handling the error;

// err --> is an instance of ApiError.

const handleError = (err, res) => {
    const { statusCode, message } = err;
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
};


module.exports = {
    ApiError, 
    handleError
}


