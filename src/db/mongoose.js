//Call the Mongoose library to create a connection with the database
const mongoose = require('mongoose');

//Connect Mongoose to the MongoDB and the the taskia-api database
<<<<<<< HEAD
mongoose.connect(process.env.MONGO_DB_URL, {
=======
mongoose.connect('mongodb://127.0.0.1:27017/taskia-api', {
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});
