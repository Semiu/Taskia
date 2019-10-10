//Load the express package for server running
const express = require ('express');
//
const User = require('../models/users')
//
const auth = require('../middleware/auth')
//
const router = new express.Router();

//Create User
router.post('/users', async (req, res) => {
    
    //creating an instance of user from the User class (exported from the users.js) through the constructor function
    const user = new User(req.body);
    
    //
    try {

        await user.save()

        const token = await user.generateAuthToken()

        res.status(201).send({user, token})

    } catch (e) {
        res.status(400).send(e)

    }

});

//User's log in
router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()

        res.send({user, token})

    } catch(e){
        res.status(400).send() 

    }

})

// Fetch the authenticated user's profile. The auth is a middleware @ auth.js
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
    
 });
 

//Fetch a user by ID
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const userById = await User.findById(_id)
        if(!userById){
            return res.status(404).send()
        }
        res.send(userById)
    } catch(e) {
        res.status(500).send()

    }
    
});

//Update user by ID
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName', 'lastName', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){

        return res.status(400).send({error: "Invalid updates!"});

    }

    try {

        const user = await User.findById(req.params.id)

        updates.forEach((updates) => user[update] = req.body[update]) 

        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)

    } catch(e){
        res.status(400).send(e)

    }

})

//Delete user
router.delete('/user/:id', async (req, res) => {

    try{

        const user = await User.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send()
        }

        res.send(user)

    } catch (e){

        res.status(400).send(e)

    }

})

//
module.exports = router;