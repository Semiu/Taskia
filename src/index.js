//Load the database connection module from the db folder
require('./db/mongoose')

//Load the express package for server running and connection
const express = require ('express');

//Access the express package function
const app = express();

//Load the Cookie Parser package
const cookieParser = require('cookie-parser');

//Use the cookie-parser package
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

//Invoke the use function from express, and express.json as the argument
app.use(express.json());

//Import each of the routers (users and tasks) from the router folder
const userRouter = require('./routers/users-route');

const taskRouter = require('./routers/tasks-route')

//Connect the server to the user route for HTTP request and response
app.use(userRouter)

//Connect the server to the task route for HTTP request and response
app.use(taskRouter)

//Create a port thread for handling the HTTP request or a local host
const port = process.env.PORT

//Listen function to identify if the server is running and on which of the ports
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});