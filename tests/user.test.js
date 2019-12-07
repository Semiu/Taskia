//Load the supertest package
const request = require('supertest');

//Load the app module
const app = require('../src/app');
test ('Should sign up a new user', async () => {

    await request (app).post('/users').send({
        firstName: "Semiu",
        lastName: "Akanmu",
        email: "ayobami.sm@gmail.com",
        password: "AJANlekoko@2019"
        //Like Assert 201 which is success response
        //Or throw an error inidcating the test failed
    }).expect(201)
})




