const express = require("express");
const router= express.Router();
const check_auth = require("../middleware/auth")

const categorycontroller = require("../controllers/category_controller");
//show al category
router.get("/",check_auth,categorycontroller.getcategory)

//create category
router.post("/",check_auth,categorycontroller.createcategory)

//update category
router.patch("/:categoryId",check_auth,categorycontroller.updatecategory)

//delete category
router.delete("/:categoryId",check_auth,categorycontroller.deletecategory)

module.exports=router;