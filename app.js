const express  = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const UserDatumRouter = require('./routers/userDatum');
const LikedProfileRouter = require('./routers/likedProfiles');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/errorHandler');
require('dotenv/config');

app.use(cors());
app.options('*',cors());
const api = process.env.API_URL;
//  api+'/product'
//middleware
app.use(express.json());
app.use(morgan('tiny'));
//authenticator 
//app.use(authJwt());
//app.use(errorHandler)


// app.use((err,req,res,next)=>{
//     if(err){
//         res.status(401).json(err);
//     }
// });

//routers
app.use(`${api}/users`,UserDatumRouter);
app.use(`${api}/liked_profile`,LikedProfileRouter);




//database
mongoose.connect(process.env.CONNECTION_STR,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "sree",
  })
.then(()=>{
    console.log('connected with mongoDB..')
})
.catch(err=>{
    console.log(err + 'madhan');
});

//server
//development
/* app.listen('3000', ()=> {
    console.log(api);
    console.log('Connected to local host');
}); */

// production

var server = app.listen(process.env.PORT || 3000, function(){
    var port = server.address().port;
    console.log('Express is working on port ' + port)
})