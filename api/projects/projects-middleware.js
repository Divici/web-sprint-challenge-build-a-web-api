function validateProject(req, res, next) {
    const {name} = req.body;
    if(!name || !name.trim()){
        res.status(400).json({message: "Required name field is missing"})
    }
    else{
        req.name = name.trim()
        next();
    }
}

module.exports = {
    validateProject,
}
