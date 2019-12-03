//Load the required packages for this module dependency
const mongoose = require('mongoose');
//Defining the taskSchema for the Tasks
const taskSchema = mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    taskName: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if (value === ""){
                throw new Error("This field is required!");
            }
        }
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
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
    /**
    timeLeft: {
        type: Number
    },
    */
    completed: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

//Creating and Saving the Mongoose Models for Task
const Task = mongoose.model('Task', taskSchema);

//Converting this into a single module/class
module.exports = Task;