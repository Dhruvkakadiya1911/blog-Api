const express = require("express");
const { model } = require("mongoose");
const multer  = require('multer')
const router= express.Router();
const path = require("path")
const allblog_controller = require("../controllers/allblog_controller.js");
const check_auth = require("../middleware/auth")

const storage = multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"./uploads")
    },filename:function(req,file,cb){
       cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage:storage}) 

//get blog with title/description/category
router.get("/allblog",check_auth,allblog_controller.getallblog);

//get blog with all detail
router.get("/all_blog",check_auth,allblog_controller.getblog);

//create blog
router.post("/",check_auth,upload.single("Image"),allblog_controller.addblog);

//get single blog 
router.get("/:blogId",check_auth,allblog_controller.getsingleblog)

//update blog 
router.patch("/:blogId",check_auth,allblog_controller.updateblog)

//delete blog
router.delete("/:blogId",check_auth,allblog_controller.deleteblog);

module.exports=router;