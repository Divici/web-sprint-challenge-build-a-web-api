const express = require('express');
const {validateProject, validateProjectId, } = require('./projects-middleware')
const ProjectsModel = require('./projects-model')

const router = express.Router();

router.get('/', (req, res, next) =>{
    ProjectsModel.get()
        .then(projects => {
            res.json(projects)
        })
        .catch(next);
})

router.get('/:id', validateProjectId, (req, res, next) =>{
    res.json(req.project);
})

router.post('/', (req, res, next) =>{
    const {name, description} = req.body;
    if(!name || !description){
        res.status(400).json({message: "Please provide name and description for the project"})
    }
    else {
        ProjectsModel.insert(req.body)
            .then(project => {
                res.status(201).json(project)
            })
            .catch(next)
    }
})

router.put('/:id', validateProject, validateProjectId, (req, res, next) =>{
    next()
})

router.delete('/:id', validateProjectId, (req, res, next) =>{
    next()
})

router.get('/:id/actions', validateProjectId, (req, res, next) =>{
    next()
})

router.use((err, req, res, next) =>{
    res.status(err.status || 500).json({
      message: err.message,
    stack: err.stack})
  })

module.exports = router;