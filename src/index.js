//Load in the app module
const app = require('./app');

//Create a port thread for handling the HTTP request or a local host
const port = process.env.PORT

//Listen function to identify if the server is running and on which of the ports
app.listen(port, () => {
    console.log('Server is up on port ' + port);
});