<<<<<<< HEAD
//Load the Web token library
const jwt = require ('jsonwebtoken')

//Load the User model
const User = require('../models/users')

//The auth function
=======
//
const jwt = require ('jsonwebtoken')

//
const User = require('../models/users')

//
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
const auth = async (req, res, next) => {

    try {

        const token = req.header('Authorization').replace('Bearer ', '')

<<<<<<< HEAD
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
=======
        const decoded = jwt.verify(token, 'adelowowonwmowi')
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5

        const user = await User.findOne( { _id: decoded._id, 'tokens.token': token })

        if (!user) {

            throw new Error()

        }

<<<<<<< HEAD
        req.token = token

=======
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
        req.user = user

        next()

    } catch (e) {

        res.status(401).send({ error: 'Please authenticate.' })

    }
}

module.exports = auth;