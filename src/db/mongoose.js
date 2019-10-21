//Call the Mongoose library to create a connection with the database
const mongoose = require('mongoose');

//Connect Mongoose to the MongoDB and the the taskia-api database
mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});
