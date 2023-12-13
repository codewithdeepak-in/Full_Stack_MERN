const { authService, emailService } = require('../services');
const { userService } = require('../services');
const httpStatus = require('http-status');


const authController = {
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.createUser(email, password);
            const token = await authService.genAuthToken(user);
            await emailService.registerEmail(email, user);

            res.cookie('x-access-token', token, {
                httpOnly: true,
                secure: false, // For development, set to false (true for HTTPS)
                sameSite: 'strict',
            }).status(httpStatus.CREATED).send({ user, token });
        } catch (error) {
            next(error);
        }
    },
    async signin(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await authService.signinfindEmailwithPassword(email, password);
            const token = await authService.genAuthToken(user);
            res.cookie('x-access-token', token).status(httpStatus.CREATED).send({ user, token });
        } catch (error) {
           next(error);
        }
    },


    async isauth(req, res, next) {
        try {
            res.json({ message: 'You are authenticated!', user: req.user });
        } catch (error) {
            throw error
        }
    },

    async testrole(req, res, next){
        try{
            res.json({ok : 'yes'});
        }catch(error){
            res.json({error: 'Error'});
        }
    }
}

module.exports = authController;