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
    ProjectsModel.update(req.params.id, req.body)
        .then((editedProject) => {
            return editedProject
        })
        .then(getById =>{
            if(getById){
                return ProjectsModel.get(req.params.id)
            }
        })
        .then(project =>{
            res.json(project)
        })
        .catch(next)
})

router.delete('/:id', validateProjectId, async (req, res, next) =>{
    try {
        await ProjectsModel.remove(req.params.id)
        res.json(req.project)
    }
    catch (err){
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) =>{
    try {
        const result = await ProjectsModel.getProjectActions(req.params.id)
        res.json(result)
      }
      catch (err) {
        next(err)
      }
})

router.use((err, req, res, next) =>{
    res.status(err.status || 500).json({
      message: err.message,
    stack: err.stack})
  })

module.exports = router;