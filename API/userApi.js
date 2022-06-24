//Create route to handle user api req
const express = require('express');
const userApi = express.Router();
const expAsync = require('express-async-handler');
//For password hashing - bcryptjs
const bcrypt = require('bcryptjs')
//json web token
const jwt = require('jsonwebtoken')
require("dotenv").config()

var cloudinary = require("cloudinary").v2
const {CloudinaryStorage} = require("multer-storage-cloudinary")
const multer = require("multer")

cloudinary.config({
    cloud_name: "dvdoaedzj",
    api_key: "594175555134839",
    api_secret: "Ld_5isO89ktUpOMF7Ti6_beFSiA",
    secure: true,
})

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        return {
            folder: "students",
            public_id: file.fieldname + "-" + Date.now(),
        };
    },
});

var upload = multer({storage: cloudinaryStorage})

userApi.use(express.json())
userApi.use(express.urlencoded())

// create REST API
userApi.get('/getusers', expAsync(async(request, response)=>{
    let userDBobj = request.app.get("userDBobj")
    let users = await userDBobj.find().toArray()
    response.send({message:"All users", payload:users})
}))
userApi.post('/userlogin', expAsync(async(request, response)=>{
    let userDBobj = request.app.get("userDBobj")
    //get user credentials object from client
    let userCredObj = request.body
    console.log(userCredObj)
    //search for user by username
    let userDB = await userDBobj.findOne({username:userCredObj.username})
    console.log(userDB)
    if (userDB == null){
        response.send({message:"Invalid user"})
    }
    else{
        //compare passwords using compare method in bcryptjs module
        let status = await bcrypt.compare(userCredObj.password, userDB.password)
        //unmatched pwds
        if (status == false){
            response.send({message:"Invalid password"})
        }
        else{
            //creating json web token
           let token = jwt.sign({username:userDB.username}, process.env.SECRET_KEY, {expiresIn:"90"})
           //send to client
           response.send({message:"success", payload:token, userObj:userDB})
        }
    }
}))
userApi.post('/create-user', upload.single("photo"), expAsync(async(request, response)=>{
    let userDBobj = request.app.get("userDBobj")
    let newUserObj = JSON.parse(request.body.userObj)
    let userDB = await userDBobj.findOne({username:newUserObj.username})
    console.log(request.file.path)
    if (userDB != null){
        response.send({message:"username already exists, Try another username"})
    }
    else{
        let hashedPwd = await bcrypt.hash(newUserObj.password, 5)
        newUserObj.password = hashedPwd

        newUserObj.profileImg = request.file.path

        await userDBobj.insertOne(newUserObj)
        response.send({message:"User created successfully"})
    }
}))

userApi.put('/update-user', expAsync(async(request, response)=>{
    let userDBobj = request.app.get("userDBobj")
    let userObj = request.body;
    let user = await userDBobj.findOne({username:userObj.username})
    if (user == null){
        response.send({message:"Invalid user"})
    } 
    else{
        await userDBobj.updateOne({username:user.username}, {$set:{name:userObj.name, course:userObj.course}})
        response.send({message:"Updated user details"})
    }
}))

userApi.delete('/remove-user/:username', expAsync(async(request, response)=>{
    let userDBobj = request.app.get("userDBobj")
    let uname = request.params.username
    console.log(uname)
    let user = await userDBobj.findOne({username: uname})
    //console.log(user)
    if (user == null){
        response.send({message:"User does not exist"})
    }
    else{
        await userDBobj.deleteOne({username: uname})
        response.send({message:"User Removed"})
    }
}))

module.exports = userApi