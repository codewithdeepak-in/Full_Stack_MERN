



const { User } = require('../modals/users');
require('dotenv').config();

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt'); //Importing Jwt Strategy.

const jwtOptions = {
    secretOrKey: process.env.DB_SECRET,   // Secret key.
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()   
}

const jwtVerify = async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);
        if (!user) {
            return done(null, false)
        }
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy
}