const ActionsModel = require('./actions-model')

function validateAction(req, res, next) {
    const {project_id, description, notes} = req.body;
    if(!project_id || !description || !notes ){
        res.status(400).json({message: "Required project ID, description or notes field is missing"})
    }
    else{
        req.project_id = project_id
        req.description = description
        req.notes = notes
        next();
    }
}

async function validateActionId(req, res, next) {
    try{
      const action = await ActionsModel.get(req.params.id)
      if(!action){
        res.status(404).json({message: 'action not found'})
      }
      else{
        req.action = action;
        next()
      }
    }
    catch (err){
      res.status(500).json({message: 'problem finding action'})
    }
}

module.exports = {
    validateAction,
    validateActionId
}

