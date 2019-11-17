//Load the express package for server running
const express = require ('express');
//Load the image upload middleware
const upload = require('../middleware/upload')
//Load the sharp library for image formatting and resizing
const sharp = require('sharp')
//Load the User model
const User = require('../models/users')
//Load the Authetication module
const auth = require('../middleware/auth')
//Load the Email sending modules
const emails = require('../emails/account')
//Initialize a new route from the Express server library
const router = new express.Router();

//Create User route
//const createUser
router.post('/users', async (req, res) => {
    
    //creating an instance of user from the User class (exported from the users.js) through the constructor function
    const user = new User(req.body);

    //
    try {

        await user.save()

        emails.sendWelcomeEmail(user.email, user.firstName)

        const token = await user.generateAuthToken()

        res.cookie('auth_token', token, {
            maxAge: 36000,
            httpOnly: true
        })

        res.status(201).send({user, token})

    } catch (e) {
        res.status(400).send(e)

    }
});

//User's log in route
//const loginUser
router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()

        res.cookie('auth_token', token, {
            maxAge: 36000,
            httpOnly: true
        })

        // This send all the user's data
        res.send({ user, token })

        //To send delineated user's data meant for the public 
        //res.send({ user: user.getPublicProfile(), token })

    } catch(e){
        res.status(400).send() 

    }

});

//User's log out route for a particular session
//const logoutUser
router.post('/users/logout', auth, async (req, res) => {

    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })

        await req.user.save()

        res.send()

    } catch (e) {
        res.status(500).send()
    }

});

//User's log out for all sessions
//const logoutUserfromAll
router.post('/users/logoutAll', auth, async (req, res) => {

    try {

        req.user.tokens = []
        await req.user.save()

        res.send()

    } catch (e) {

        res.status(500).send()
    }

});

// Fetch the authenticated user's profile. The auth is a middleware @ auth.js
//const displayUserProfile
router.get('/users/me', auth, async (req, res) => {
    
    res.send(req.user)
    
 });

//Update user by ID
//const updateuserInfo
router.patch('/users/me', auth, async (req, res) => {

    const updates = Object.keys(req.body)
    const allowedUpdates = ['firstName', 'lastName', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){

        return res.status(400).send({error: "Invalid updates!"});

    }
    try {
        
        updates.forEach((update) => req.user[update] = req.body[update]) 

        await req.user.save()

        res.send(req.user)

    } catch(e) {
        res.status(400).send(e)

    }
})

//Delete user
//const deleteUser
router.delete('/users/me', auth, async (req, res) => {

    try {
       
       await req.user.remove()

       emails.sendExitingEmail(req.user.email, req.user.firstName)

       res.send(req.user)

    } catch (e) {

        res.status(400).send(e)

    }

})

//Upload user's avatar route
//const uploadAvatar
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {

    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()

    req.user.avatar = buffer

    await req.user.save()

    res.send()

}, (error, req, res, next) => {

    res.status(400).send({ error: error.message })

})

//Delete user's avatar
//const deleteAvatar
router.delete('/users/me/avatar', auth, async (req, res) => {

    req.user.avatar = undefined

    await req.user.save()

    res.send()

})

//Fetch user's avatar for display
//const displayAvatar 
router.get('/users/:id/avatar', async (req, res) => {

    try {

        const user = await User.findById(req.params.id)

        if (!user || !user.avatar){
            throw new Error()
        }

        res.set('Content-Type', 'image/png')

        res.send(user.avatar)

    } catch (e) {
        res.status(404).send()
    }

})

//Export the router as a single module
module.exports = router;