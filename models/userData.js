const mongoose = require('mongoose');

const userDataSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    passwordHash: {
        type:String,
        required:true
    },
    isAdmin: {
        type:Boolean,
        default:false
    },
    fatherName: {
        type:String,
        required:true
    },
    motherName: {
        type:String,
        required:true
    },
    image:{
        type:String,
        default: ''
    },
    address:{
        type:String,
        required: true
    },
    phoneNo:{
        type:String,
        required:true
    },
     age: {
        type:Number,
        required:true
    },
    dob:{
        type:String,
        required:true
    },
    star: {
        type:String,
        default:''
    },
    zodiac: {
        type:String,
        default:''
    },   
     educationalQualification: {
        type:String,
        default:''
    },
    work: {
        type:String,
        default:''
    },
     salary: {
        type:String,
        default:''
    },
    siblings: {
        type:String,
        default:''
    },
    horoscope: {
        type:String,
        default:''
    }
});

userDataSchema.virtual('id').get(function () {
    console.log(this._id.toHexString());
    return this._id.toHexString();
});

userDataSchema.set('toJSON',{
    virtual: true,
});
// here we are exporting the userData itself
exports.UserData = mongoose.model('user_data',userDataSchema);
exports.userDataSchema = userDataSchema;

