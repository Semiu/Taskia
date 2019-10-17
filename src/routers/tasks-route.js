//Load the express package for server running
const express = require ('express');

//Load the Task model
const Task = require('../models/tasks')

<<<<<<< HEAD
//Load the auth module
const auth = require ('../middleware/auth')

//Create an instance of the router from the Express library
const router = new express.Router()

//Create Task
router.post('/tasks', auth, async (req, res) => {
    
    //creating an instance of task from the Task class (exported from the tasks.js) through the constructor function
    // This: const task = new Task(req.body); is when the task is not associated with a user's authentication
    const task = new Task({
        //... is a spread operator from JS ES6
        ...req.body,
        userId: req.user._id 

    })
=======
// create the Task route
const router = new express.Router()

//Create Task
router.post('/tasks', async (req, res) => {
    
    //creating an instance of task from the Task class (exported from the tasks.js) through the constructor function
    const task = new Task(req.body);
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5

    // Try and catch bloc for error handling
    try {
        await task.save()
        res.status(201).send(task)

    } catch (e) {
        res.status(400).send(e)

    }

});

<<<<<<< HEAD
//Fetch all Tasks -created by the user based on the authentication
// GET /tasks?completed=true
// GET /tasks?limit=10&skip=0
// GET /tasks?sortBy=createdAt_asc
router.get('/tasks', auth, async (req, res) => {

    const match = {}

    const sort = {}

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try {

        //const tasks = await Task.find({ userId: req.user._id })

        //await req.user.populate('tasks').execPopulate()

        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate()

        res.send (req.user.tasks)

        //res.send(tasks)
 
    } catch (e) {
        res.status(500).send(e)
    }
});

//Fetch a Task -created by the user based on the authentication
router.get('/tasks/:id', auth, async (req, res) => {

    const _id = req.params.id

    try {

        const task = await Task.findOne({ _id, userId: req.user._id  })
=======
//Fetch all Tasks
router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({ })
        res.send(tasks)
 
    } catch (e) {
        res.status(500).send(e)
    }
});

//Fetch Task by ID
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {

        const taskById = await Task.findById(_id)
        if(!taskById){
            return res.status(404).send()
        }

        res.send(taskById)

    } catch(e) {
        res.status(500).send()

    }
});

//Delete task
router.delete('/task/:id', async (req, res) => {

    try{

        const task = await Task.findByIdAndDelete(req.params.id)
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5

        if(!task){
            return res.status(404).send()
        }

        res.send(task)

<<<<<<< HEAD
    } catch(e) {
        res.status(500).send()

    }
});

//Update a Task -only by the authorised user
router.patch('/tasks/:id', auth, async (req, res) => {

=======
    } catch (e){
        
        res.status(400).send(e)

    }

})

//Update Task by ID
router.patch('/tasks/:id', async (req, res) => {
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
    const updates = Object.keys(req.body)
    const allowedUpdates = ['taskName', 'description', 'timeDue', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        
        return res.status(400).send({error: "Invalid updates!"});

    }

    try {

<<<<<<< HEAD
        const task = await Task.findOne({_id: req.params.id, userId: req.user._id})

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])

        await task.save()

        res.send(task)

    } catch(e){
        res.status(400).send(e)

    }

})

//Delete task created by the authentic user
router.delete('/tasks/:id', auth, async (req, res) => {

    try{

        const task = await Task.findOneAndDelete({_id: req.params.id, userId: req.user._id})

        if(!task){
=======
        const task = await Task.findById(req.params.id)

        updates.forEach((updates) => task[update] = req.body[update])

        await task.save()

        if (!task) {
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
            return res.status(404).send()
        }

        res.send(task)

<<<<<<< HEAD
    } catch (e){
        
=======
    } catch(e){
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
        res.status(400).send(e)

    }

})

<<<<<<< HEAD
//Export as a single module
=======
//
>>>>>>> 3cd98c82ce2a1412abf9344406880b186141b5c5
module.exports = router;