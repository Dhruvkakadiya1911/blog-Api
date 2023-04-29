const express = require("express");
const { model } = require("mongoose");
const router= express.Router();
const admincontroller = require("../controllers/admincontroller");
const check_auth = require("../middleware/auth")

//get admin
router.get("/",admincontroller.admin);

//login admin
router.post("/login",admincontroller.loginadmin);

//logout admin
router.delete("/logout/:adminId",check_auth,admincontroller.logoutadmin);

module.exports=router;