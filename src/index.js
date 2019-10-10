//Load the express package for server running and connection
const express = require ('express');

//Load the database connection module from the db folder
require('./db/mongoose')

//Import each of the routers (users and tasks) from the router folder
const userRouter = require('./routers/users-route')

const taskRouter = require('./routers/tasks-route')

//Access the express package function
const app = express();

//Create a port thread for handling the HTTP request or a local host
const port = process.env.PORT || 3000

//Invoke the use function from express, and express.json as the argument
app.use(express.json());

//Connect the server to the user route for HTTP request and response
app.use(userRouter)

//Connect the server to the task route for HTTP request and response
app.use(taskRouter)

//Listen function to identify if the server is running and on which of the ports
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});