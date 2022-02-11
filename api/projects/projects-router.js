const express = require('express');
const {validateProject, } = require('./projects-middleware')
const ProjectsModel = require('./projects-model')

const router = express.Router();

router.get('/', (req, res, next) =>{
    ProjectsModel.get()
        .then(projects => {
            console.log(projects);
        })
        .catch((err) => {
            console.log('it didnt work');
            next()
        });
})

router.get('/:id', (req, res, next) =>{
    next()
})

router.post('/', (req, res, next) =>{
    const {name, description} = req.body;
    if(!name || !description){
        res.status(400).json({message: "Please provide name and description for the project"})
    }
    else {
        ProjectsModel.insert(req.body)
            .then(result => {
                console.log(result);
                //res.status(201).json(result))
            })
            .catch((err) => {
                console.log('wasnt able to post');
            });
    }
})

router.put('/:id', validateProject, (req, res, next) =>{
    next()
})

router.delete('/:id', (req, res, next) =>{
    next()
})

router.get('/:id/actions', (req, res, next) =>{
    next()
})

router.use((err, req, res, next) =>{
    res.status(err.status || 500).json({
      message: err.message,
    stack: err.stack})
  })

module.exports = router;