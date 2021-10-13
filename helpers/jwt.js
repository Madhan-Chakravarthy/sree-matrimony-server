const expressJwt = require('express-jwt');

function authJwt(){
    const secret = process.env.JSON_SECRET_KEY;
    return expressJwt({
        secret,
        algorithms: ['HS256']
    }).unless({
       path:[
        '/api/v1/users/login'
       ] 
    });
}

module.exports= authJwt;