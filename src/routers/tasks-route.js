//Load the express package for server running
const express = require ('express');

//Load the Task model
const Task = require('../models/tasks')

// create the Task route
const router = new express.Router()

//Create Task
router.post('/tasks', async (req, res) => {
    
    //creating an instance of task from the Task class (exported from the tasks.js) through the constructor function
    const task = new Task(req.body);

    // Try and catch bloc for error handling
    try {
        await task.save()
        res.status(201).send(task)

    } catch (e) {
        res.status(400).send(e)

    }

});

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

        if(!task){
            return res.status(404).send()
        }

        res.send(task)

    } catch (e){
        
        res.status(400).send(e)

    }

})

//Update Task by ID
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['taskName', 'description', 'timeDue', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if(!isValidOperation){
        
        return res.status(400).send({error: "Invalid updates!"});

    }

    try {

        const task = await Task.findById(req.params.id)

        updates.forEach((updates) => task[update] = req.body[update])

        await task.save()

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)

    } catch(e){
        res.status(400).send(e)

    }

})

//
module.exports = router;