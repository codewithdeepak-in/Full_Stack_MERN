const  userService  = require('./user.service');
const { User } = require('../modals/users');
const { ApiError } = require('../middleware/apierror');
const httpStatus = require('http-status');
const createUser = async (email, password) => {
    try{
        if(await User.emailTaken(email)){
            throw new ApiError(httpStatus.BAD_REQUEST, 'Email is Already Taken');
        }
        const user = new User({
            email,
            password
        })
        await user.save();
        return user;
    }catch(error){
        throw error;
    }
}

const genAuthToken = (user) => {
    const Token = user.generateAuthToken();
    return Token;
}

const signinfindEmailwithPassword = async (email, password) => {
    try{
        const user = await userService.findwithEmail(email);
        if (!user) {
            throw new ApiError(httpStatus.BAD_REQUEST,'Email is not Exists');
        }
        if (!(await user.comparePassword(password))) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Wrong User Password');
        }
        return user;
    }catch(error){
        throw error
    }
}


module.exports = {
    createUser,
    genAuthToken,
    signinfindEmailwithPassword
}