const mongoose = require("mongoose");
const Category = require("../models/M_Category")


module.exports = {

     //get all category
    getcategory: (req, res, next) => {
      Category.find()
      .select('-__v ')
      .exec()
      .then(result=>{
        res.status(200).json({
            Category:result
        })
      })
      .catch(err =>{
        res.status(500).json({
            error:err
        })
      })
    },

     //add category 
    createcategory:(req, res, next) => {
        const category = new Category({
            _id : new mongoose.Types.ObjectId(),
            category:req.body.category,
        });
        category.save()
        .then(result =>{
            res.status(201).json(result)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    //update category
    updatecategory: async (req, res, next) => {
        try {
            const id =req.params.categoryId
            const update= req.body
            const option={ new:true};
            const result = await Category.findByIdAndUpdate(id,update,option)
            res.status(200).json({
                message:"category updated"
            })
        } catch (error) {
            res.status(500).json(error)
        }
    },

    //delete category
    deletecategory: async (req, res, next) => {
        try {
            const id = req.params.categoryId
            const result=await Category.findByIdAndDelete(id)
            res.status(200).json({
                message:"category deleted"
            })
        } catch (error) {
            
        }

    }
}