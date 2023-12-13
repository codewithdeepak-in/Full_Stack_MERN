const mongoose = require('mongoose');
const validator = require('validator')
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], 
        // When either of the two.
        default: 'user'
    },
    firstname: {
        type: String,
        maxlength: 100,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 100,
        trim: true
    },
    age: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: Boolean,
        default: false
    }
})

// check wheather email is taken or not.
userSchema.statics.emailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

// perform action before saving the data to database.

userSchema.pre('save', async function(next){
    let user = this;
    if(user.isModified('password')){ 
        // only implement when the password change next time.
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }
    next(); // callback called in middleware.
})


userSchema.methods.generateAuthToken = function(){
    let user = this; // pointing to schema.
    const userObj = {sub: user._id.toHexString(), email: user.email}
    const token = jwt.sign(userObj, process.env.DB_SECRET, {expiresIn: '1d'});
    return token;
}

userSchema.methods.comparePassword = async function(candidatePassword){
    const user = this;
    const match = await bcrypt.compare(candidatePassword, user.password);
    return match;
}

userSchema.methods.generateRegisterToken  = function(){
    let user = this;
    const userObj = {sub: user._id.toHexString()};
    const token = jwt.sign(userObj, process.env.DB_SECRET, {expiresIn: '10h'});
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = { User };