const {UserData} = require('../models/userData')

const express  = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const FILE_TYPE_MAP ={
    'image/png' : 'png',
    'image/jpeg' :'jpeg',
    'image/jpg' : 'jpg'
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValidFile = FILE_TYPE_MAP[file.mimetype]
        let uploadError = new Error("Not a valid file");
        if(isValidFile)
            uploadError = null;
    
      cb(uploadError, 'public/upload')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.split(' ').join('-')
      const extension = FILE_TYPE_MAP[file.mimetype]
      cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
  })
  const upload = multer({ storage: storage });
router.get(`/`,async (req,res)=>{
    const userList = await UserData.find().select('-passwordHash');
    res.send(userList);
})


router.get('/:id',async (req,res)=>{
    const user = await UserData.findById(req.params.id).select('-passwordHash');
    if(!user){
        res.status(500).json({message: 'The user with the given ID was not found'})
    }
    res.status(200).send(user);
})
router.post(`/`,upload.single('image'),(req,res)=>{
    const doesItContainFile = req.file;
    if(!doesItContainFile)
    res.status(500).json({message: 'NO Image found'})
    const fileName = req.file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/upload/`;
   const userData = new UserData ({
       name: req.body.name,
       email: req.body.email,
       passwordHash: bcrypt.hashSync(req.body.password, 10),
       isAdmin: req.body.isAdmin,
       fatherName: req.body.fatherName,
       motherName: req.body.motherName,
       image: `${basePath}${fileName}`,
       address: req.body.address,
       phoneNo: req.body.phoneNo,
       age: req.body.age,
       dob: req.body.dob,
       zodiac: req.body.zodiac,
       educationalQualification: req.body.educationalQualification,
       work: req.body.work,
       salary: req.body.salary,
       siblings: req.body.siblings,
       horoscope: req.body.horoscope
   }) 
   userData.save();
   res.send(userData);
})

router.post('/login', async (req,res)=>{
    const user = await UserData.findOne({email: req.body.email});
    if(!user){
        res.status(500).json({message: 'The user with the given ID was not found'})
    }
    if(user && bcrypt.compareSync(req.body.password,user.passwordHash)){
        const token=  jwt.sign(
            {
                userId:user.id,
                isAdmin:user.isAdmin
            },
            process.env.JSON_SECRET_KEY,
            {expiresIn:'1d'}
        )
        res.status(200).send({userId:user.id,email:user.email,token:token});
    }else{
        res.status(400).send('password is wrong');
    }
})
router.put('/:id',async (req, res)=> {

    const userExist = await UserData.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await UserData.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            isAdmin: req.body.isAdmin,
            fatherName: req.body.fatherName,
            motherName: req.body.motherName,
            image:req.body.image,
            address: req.body.address,
            phoneNo: req.body.phoneNo,
            age: req.body.age,
            dob: req.body.dob,
            zodiac: req.body.zodiac,
            educationalQualification: req.body.educationalQualification,
            work: req.body.work,
            salary: req.body.salary,
            siblings: req.body.siblings,
            horoscope: req.body.horoscope
        },
        { new: true}
    )

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})

router.delete('/:id', (req, res)=>{
    UserData.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})


router.get(`/get/count`, async (req, res) =>{
    const userCount = await UserData.countDocuments()

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})

// here we are exporting the module
module.exports =router;