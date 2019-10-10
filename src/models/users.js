//Loading the required packages for this module dependency
const mongoose = require('mongoose');
const validator = require('validator');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;
const validate = require('validate.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//Create a new instance of the ObjectID when the script is run
const id = new ObjectID();

//Defining the userSchema for the users
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (value === ""){
                throw new Error("This field is required!");
            }
        }
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (value === ""){
                throw new Error("This field is required!");
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (value == ""){
                throw new Error("Enter your Email address!");
            }
            if(!validator.isEmail(value)){
                throw new Error("Email address is invalid!");
            }
        }
    },
    password: {
        type: String,
        //validate: function (value) {
                //return /^[a-zA-Z0-9\ ^ ${ } [ ] ( ) . + ? | - &]$/.test(value)
                
        //},
        required: true,
        trim: true,
        minlength: 8
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }

    }],
    image: {
        type: Buffer
    }
});


//Generate AuthToken function for the userSchema
userSchema.methods.generateAuthToken = async function () {

    const user = this
    
    const token = jwt.sign( { _id: user._id.toString() }, 'adelowowonwmowi' )

    user.tokens = user.tokens.concat( {token} )

    await user.save()

    return token

}

//Find the user by the email supplied, and compare the password supplied with the password registered
userSchema.statics.findByCredentials = async (email, password) => {

    const user = await User.findOne( { email } )

    if (!user){
        throw new Error ('This user does not exist')

    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch){
        throw new Error('Unable to login')
    }

    return user

}


//Middleware for the hashing of the password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)

    }
    next()
})

//Creating and Saving the Mongoose Models for User
const User = mongoose.model('User', userSchema);

//Converting this into a single module/class
module.exports = User;