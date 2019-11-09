//Load the path library
const path = require('path')

//Load the express package for server running and connection
const express = require ('express');

//Load the Handlebars library
const hbs = require ('hbs')

//Load the database connection module from the db folder
require('./db/mongoose')

//Assign the view directory to a variable for Express rendering
const publicView = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Import each of the routers (users and tasks) from the router folder
const userRouter = require('./routers/users-route')

const taskRouter = require('./routers/tasks-route')

//Access the express package function
const app = express();

//Create a port thread for handling the HTTP request or a local host
const port = process.env.PORT

//Set-up  handle-bars and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')

//Register the HBS register for the partial
hbs.registerPartials(partialPath)

//Route for rendering the index.hbs file
app.get('', (req, res) => {
    res.render('index', {

    })

})

//Route for rendering the index.hbs file
app.get('/index', (req, res) => {
    res.render('index', {

    })

})

//Route for rendering the dashboard.hbs file
app.get('/signup', (req, res) => {
    res.render('signup', {
        

    })

})

//Route for rendering the dashboard.hbs file
app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        dev: "Semiu"

    })

})

//Invoke the use function from express, and express.json as the argument
app.use(express.json());

//Method for the Express server to render the root directory file --files in the view -HTML, CSS, Client side JavaScript
app.use(express.static(publicView))

//Connect the server to the user route for HTTP request and response
app.use(userRouter)

//Connect the server to the task route for HTTP request and response
app.use(taskRouter)

//Listen function to identify if the server is running and on which of the ports
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});