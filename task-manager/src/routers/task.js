const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

// --------------------------------------------

router.get( '/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        if (!tasks) res.status(404).send()

        res.send(tasks)
    } catch(e) {
        res.status(500).send()
    }
    // Task.find({})   .then(tasks => res.send(tasks))
    //                 .catch(error => res.status(500).send(error));
})

router.get( '/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id)
        if (!task) return res.status(404).send()

        res.send(task)
    } catch(e) {
        res.status(500).send(e)
    }
    // Task.findById(_id)  .then( task => {
    //                         if (!task) return res.status(404).send();
                            
    //                         res.send(task);
    //                     })
    //                     .catch( error => res.status(500).send(error));

    // console.log( req.params )
})

router.post( '/tasks', async (req, res) => {
    // console.log( req.body );
    const task = new Task( req.body )

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }

    // const task = new Task( req.body );
    // task.save() .then( result => res.status(201).send( task ))
    //             .catch( error => {
    //                 res.status( 400 ).send( error )
    //             });
})

router.patch( '/tasks/:id', async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(item => allowedUpdates.includes(item))

    if (!isValidOperation) return res.status(400).send({error:'Invalid updates!'})

    try  {
        // const task = await Task.findByIdAndUpdate( _id, req.body, {new:true, runValidators:true})
        const task = await Task.findById(_id)
        updates.forEach( update => task[update] = req.body[update])
        await task.save()

        if (!task) return res.status(404).send()

        res.send(task)
    } catch(e) {
        res.status(400).send(e)
    }

})

router.delete( '/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) return res.status(404).send()

        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

// ------------------
module.exports = router