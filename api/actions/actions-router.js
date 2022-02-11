const express = require('express');
const ActionsModel = require('./actions-model')

const router = express.Router();

router.get('/', (req, res, next) =>{
    ActionsModel.get()
        .then(actions =>{
            console.log(actions);
        })
        .catch(next)
})

router.get('/:id', (req, res, next) =>{
    next()
})

router.post('/', (req, res, next) =>{
    next()
})

router.put('/:id', (req, res, next) =>{
    next()
})

router.delete('/:id', (req, res, next) =>{
    next()
})

router.use((err, req, res, next) =>{
    res.status(err.status || 500).json({
      message: err.message,
    stack: err.stack})
  })

module.exports = router;
