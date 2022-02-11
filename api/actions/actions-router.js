const express = require('express');

const ActionsModel = require('./actions-model')
const { validateAction , validateActionId} = require('./actions-middlware')

const router = express.Router();

router.get('/', (req, res, next) =>{
    ActionsModel.get()
        .then(actions =>{
            res.json(actions);
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res, next) =>{
    res.json(req.action);
})

router.post('/', validateAction, (req, res, next) =>{
    const {project_id, description, notes} = req.body;
    if(!project_id || !description || !notes){
        res.status(400).json({message: "Please provide project ID, description, and notes for the action"})
    }
    else {
        ActionsModel.insert(req.body)
            .then(action => {
                res.status(201).json(action)
            })
            .catch(next)
    }
})

router.put('/:id', validateActionId, validateAction, (req, res, next) =>{
    next()
})

router.delete('/:id', validateActionId, (req, res, next) =>{
    next()
})

router.use((err, req, res, next) =>{
    res.status(err.status || 500).json({
      message: err.message,
    stack: err.stack})
  })

module.exports = router;
