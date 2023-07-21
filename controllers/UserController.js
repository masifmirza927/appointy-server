const UserModel = require("../models/UserModel");
const { uploadImageSingle } = require("../utils/Helpers")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleSignup = async (req, res) => {

    // upload image
    uploadImageSingle(req, req.file);
    try {
        // check already registerd or not
        const userExist = await UserModel.findOne({ email: req.body.email });
        if (userExist) {
            return res.json({
                status: false,
                message: "This email is already registered"
            })
        }
        // generate hashed password
        req.body.password = await bcrypt.hash(req.body.password, 10);

        // sanitizing
        const newUser = await UserModel.create(req.body);
        const token = jwt.sign({name: newUser.name, id:newUser._id, role: newUser.role }, process.env.JWT_SECRET_KEY);

        return res.json({
            status: true,
            token: token
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            let errors = {};

            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });

            return res.json({
                status: false,
                errors: errors
            });
        }
    }
}

// login
const handleLogin = async (req, res) => {
    const {email, password} = req.body;
     //STEP 1  user is reqistered or not
     let user = await UserModel.findOne({ email: email });
     if (!user) {
         return res.json({
             status: false,
             message: "This email is not registered"
         })
     }
 
      //STEP 2 now we got the user, now check password is correct
     try {
         const isPassOk = await bcrypt.compare(password, user.password);
         if(isPassOk == true) {
             const token = jwt.sign({name: user.name, id:user._id, role: user.role }, process.env.JWT_SECRET_KEY);
             return res.json({
                 status: true,
                 token: token
             })
         }else {
             return res.json({
                 status: false,
                 message: "username or password is incorrect"
             })
         }
 
 
     } catch (error) {
         
     }
}

// profile update
const profileUpdate = async (req, res) => {
    const {email, password} = req.body;

}

// doctor settings
const doctorSettingsUpdate = async (req, res) => {
    const {userId, speciality, off_days} = req.body;
    const days = off_days.split(",");
    try {
        // const document = await UserModel.findById(userId);
        const document = await UserModel.findByIdAndUpdate({ _id: userId }, 
                { $addToSet: { off_days: { $each: days } } }, { new: true});

        return res.status(201).json({
            status: true,
            document: document
           });


        // if(document) {
        // //    document.speciality = speciality;
        // //    document.off_days.push("sunday");
        // //    await document.save();

        //    return res.status(201).json({
        //     status: true,
        //     document: document
        //    });

        // } else {
        //     return res.status(200).json({
        //         status: false,
        //         message: "No record found"
        //     })
        // }


    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message
           });
    }

}



module.exports = {
    handleSignup,
    handleLogin,
    doctorSettingsUpdate
}