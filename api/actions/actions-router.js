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
    ActionsModel.update(req.params.id, req.body)
        .then((result) => {
            return ActionsModel.get(req.params.id)
        })
        .then(action=>{
            res.json(action)
        })
        .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) =>{
    try {
        await ActionsModel.remove(req.params.id)
        res.json(req.action)
    }
    catch (err){
        next(err)
    }
})

router.use((err, req, res, next) =>{
    res.status(err.status || 500).json({
      message: err.message,
    stack: err.stack})
  })

module.exports = router;
