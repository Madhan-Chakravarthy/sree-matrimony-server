function errorHandler(err, req, res, next){
    if(err.name=='UnauthorizedError'){
        return res.status(401).json({message: 'Authentication failed'})
    }
    if(err.name=='ValidationError'){
        return res.status(401).json({message: 'Authentication failed'})
    }
    return  res.status(401).json(err);
}
module.exports = errorHandler;