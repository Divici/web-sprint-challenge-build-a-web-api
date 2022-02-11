const express = require('express');
const {validateProject, } = require('./projects-middleware')

const router = express.Router();

router.get('/', (req, res, next) =>{

})

router.get('/:id', (req, res, next) =>{
    
})

router.post('/', validateProject, (req, res, next) =>{
    
})

router.put('/:id', validateProject, (req, res, next) =>{
    
})

router.delete('/:id', (req, res, next) =>{
    
})

router.get('/:id/actions', (req, res, next) =>{
    
})

module.exports = router;