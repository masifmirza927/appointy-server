const express = require("express");
const { handleSignup, handleLogin, doctorSettingsUpdate, getSingleUser } = require("../controllers/UserController");
const UserRouter = express.Router();

// multer setup
const multer = require('multer');
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
// });
// var upload = multer({ storage: storage });
const upload = multer({ dest: 'uploads/' });

// handle signup
UserRouter.post("/signup", upload.single("image"),  handleSignup);

// handle login
UserRouter.post("/login", handleLogin);

// doctor settings update
UserRouter.post("/doctor/settings", doctorSettingsUpdate);

UserRouter.get("/:id",  getSingleUser);


module.exports = UserRouter;