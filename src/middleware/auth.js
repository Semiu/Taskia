//Load the Web token library
const jwt = require ('jsonwebtoken')

//Load the User model
const User = require('../models/users')

//The auth function
const auth = async (req, res, next) => {

    try {

        //const token = req.token['auth_token']
        const token = req.cookies['auth_token']

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findOne( { _id: decoded._id, 'tokens.token': token })

        if (!user) {

            throw new Error();

        }

        req.token = token

        req.user = user

        next()

    } catch (e) {

        res.status(401).send({ error: 'Please authenticate.' })

    }
}

module.exports = auth;