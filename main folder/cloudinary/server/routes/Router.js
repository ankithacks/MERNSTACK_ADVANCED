const express=require('express')
const router=express.Router()
const cloudinary=require('../helper/cloudinary')
const moment=require('moment')

// image upload in node server:-
const multer=require('multer')
const users = require('../model/userSchema')
// image storage path:-
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
});


// image filter:-
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allow"))
    }
}


// setting the above two functionalities in multer
const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})



// use register:-

router.post("/register",upload.single("photo"),async(req,res)=>{

    const upload = await cloudinary.uploader.upload(req.file.path);
    
    const {name} = req.body;
    
    try {
        const date = moment(new Date()).format("YYYY-MM-DD");
        
        const userdata = new users({
            name:name,
            imgpath:upload.secure_url,
            date:date
        });
        console.log(userdata)

        await userdata.save();
        res.status(200).json(userdata);
    } catch (error) {
        res.status(400).json(error)
    }
});


// user get data:-
router.get("/getdata",async(req,res)=>{
    try {
        const getUser = await users.find();
        res.status(200).json(getUser);

    } catch (error) {
        res.status(400).json(error)
        
    }
})

module.exports =router