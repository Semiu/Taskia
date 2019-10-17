//Loading the required packages for this module dependency
const mongoose = require('mongoose');
const validator = require('validator');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;
const validate = require('validate.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

<<<<<<< HEAD
//Load the Task model
const Task = require('./tasks')

=======
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
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
<<<<<<< HEAD
                //return //.test(value)
=======
                //return /^[a-zA-Z0-9\ ^ ${ } [ ] ( ) . + ? | - &]$/.test(value)
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
                
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
<<<<<<< HEAD
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

//Virtual schema to link Tasks created with Users
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'userId'
})


//Display delineated user's profile for public view
//This is a method for every instance of the user (Note: const user = this)
//userSchema.methods.getPublicProfile = function () {
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    //deleting the password and tokens from the userObject data
    delete userObject.password

    delete userObject.tokens

    delete userObject.avatar

    return userObject
}

//Generate AuthToken function for the userSchema
//This is a method for every instance of the user (Note: const user = this)
=======
    image: {
        type: Buffer
    }
});


//Generate AuthToken function for the userSchema
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
userSchema.methods.generateAuthToken = async function () {

    const user = this
    
<<<<<<< HEAD
    const token = jwt.sign( { _id: user._id.toString() }, process.env.JWT_SECRET )
=======
    const token = jwt.sign( { _id: user._id.toString() }, 'adelowowonwmowi' )
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5

    user.tokens = user.tokens.concat( {token} )

    await user.save()

    return token

}

//Find the user by the email supplied, and compare the password supplied with the password registered
<<<<<<< HEAD
//This is a method for all users -the User (upper case)
=======
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
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

<<<<<<< HEAD
//Middleware for the hashing of the password before saving
userSchema.pre('save', async function (next) {
    
=======

//Middleware for the hashing of the password before saving
userSchema.pre('save', async function (next) {
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
    const user = this

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)

    }
    next()
})

<<<<<<< HEAD
//Middleware for deleting the tasks when the user is deleted
userSchema.pre('remove', async function (next) {

    const user = this

    await Task.deleteMany({ userId: user._id })

    next() 
})


=======
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
//Creating and Saving the Mongoose Models for User
const User = mongoose.model('User', userSchema);

//Converting this into a single module/class
module.exports = User;