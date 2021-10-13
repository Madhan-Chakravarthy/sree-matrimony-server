const {LikedProfile} = require('../models/likedProfile')

const express  = require('express');
const router = express.Router();



router.get(`/`,async (req,res)=>{
    const userList = await LikedProfile.find();
    res.send(userList);
})
router.post(`/`,(req,res)=>{
   const likedProfile = new LikedProfile ({

   }) 
   likedProfile.save();
   res.send(likedProfile);
})

// here we are exporting the module
module.exports =router;