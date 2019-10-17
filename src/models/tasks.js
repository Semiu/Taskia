<<<<<<< HEAD
//Load the required packages for this module dependency
=======
//Loading the required packages for this module dependency
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
const mongoose = require('mongoose');
const validator = require('validator');
const mongodb = require('mongodb');
const ObjectID = mongodb.ObjectID;
const validate = require("validate.js");

//Create a new instance of the ObjectID when the script is run
const id = new ObjectID();

//Defining the taskSchema for the Tasks
const taskSchema = mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
        required: true,
        ref: 'User'
    },
=======
        ref: 'User'
    },
    timeCreated: {
        type: Date
    },
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
    taskName: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (value == ""){
                throw new Error("This field is required!");
            }
        }
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
<<<<<<< HEAD
    /** 
=======
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
    timeDue: {
        type: Date,
        validate(value){
            if (value == ""){
                throw new Error("This field is required!");
            }if (!validator.isAfter(value, Date.now)){
                throw new Error("Due time cannot be earlier!");
            }
        }
    },
    timeLeft: {
        type: Number
    },
<<<<<<< HEAD
    */
=======
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
    completed: {
        type: Boolean,
        default: false
    }
<<<<<<< HEAD
}, {
    timestamps: true
=======
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
});

//Creating and Saving the Mongoose Models for Task
const Task = mongoose.model('Task', taskSchema);

//Converting this into a single module/class
module.exports = Task;