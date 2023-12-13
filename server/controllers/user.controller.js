const httpStatus = require('http-status');
const { ApiError } = require('../middleware/apierror');
const { userService  } = require('../services');
const { genAuthToken } = require('../services/auth.service');
const { emailService } = require('../services');

const userController = {
    async profile(req, res, next){
        try{
            const user = await userService.findUserById(req.user._id);
            if(!user){
                throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
            }

            res.json(res.locals.permission.filter(user._doc));
        }catch(error){
            next(error);
        }
    },
    async updateProfile(req, res, next) {
        try {
            const user = await userService.updateUserProfile(req);
            res.json(res.locals.permission.filter(user._doc));
        } catch (error) {
            next(error);
        }
    },

    async updateEmail(req, res, next){
        try{
            const {newemail} = req.body;
            const user = await userService.findAndUpdateEmail(req);
            const token = await genAuthToken(user);

            await emailService.registerEmail(newemail, user);
            res.cookie('x-access-token', token).send({ok : 'yes'});

        }catch(error){
            next(error);
        }
    },
    async verifyEmail(req, res, next){
        try{
            const getToken = req.query.validation
            const token = userService.validation(getToken);
            const user = await userService.findUserById(token.sub);

            if(!user){
                throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
            }
            if(user.verfied){
                throw new ApiError(httpStatus.BAD_REQUEST, "User is Already Verified");
            }
            user.verified = true;
            user.save();
            res.status(httpStatus.CREATED).send({ email: user.email, verified: true});
        }catch(error){  
            next(error);
        }
    }
}


module.exports = userController;