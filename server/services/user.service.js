const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apierror');
const { User } = require('../modals/users');
const jwt = require('jsonwebtoken');

const findwithEmail = async (email) => {
    return await User.findOne({ email });
}
const findUserById = async (_id) => {
    return await User.findById(_id);
}

const updateUserProfile = async (req) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                "$set": {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    age: req.body.age
                }
            },
            { new: true }
        )
        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, "User not found");
        }
        return user;
    } catch (error) {
        throw error;
    }
}

const findAndUpdateEmail = async (req) => {
    try {
        // email taken
        if (await User.emailTaken(req.body.newemail)) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Email is Already Taken');
        }

        const user = await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                "$set": {
                    email: req.body.newemail, 
                    verified: false
                }
            },
            { new: true }
        )

        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
        }
        // update
        return user;
        // send data
    } catch (error) {
        throw error;
    }
}


const validation = (token) => {
    const tok = jwt.verify(token, process.env.DB_SECRET);
    return tok;
}


module.exports = { findwithEmail, findUserById, updateUserProfile, findAndUpdateEmail, validation };