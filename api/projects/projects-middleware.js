const ProjectsModel = require('./projects-model')

function validateProject(req, res, next) {
    const {name, description, completed} = req.body;
    if(!name || !name.trim() || !description || !completed ){
        res.status(400).json({message: "Required name or description field is missing"})
    }
    else{
        req.name = name.trim()
        req.description = description
        req.completed = false
        next();
    }
}

async function validateProjectId(req, res, next) {
    try{
      const project = await ProjectsModel.get(req.params.id)
      if(!project){
        res.status(404).json({message: 'project not found'})
      }
      else{
        req.project = project;
        next()
      }
    }
    catch (err){
      res.status(500).json({message: 'problem finding project'})
    }
  }

module.exports = {
    validateProject,
    validateProjectId,
}
