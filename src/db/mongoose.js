//Call the Mongoose library to create a connection with the database
const mongoose = require('mongoose');

//Connect Mongoose to the MongoDB and the the taskia-api database
mongoose.connect('mongodb://127.0.0.1:27017/taskia-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
