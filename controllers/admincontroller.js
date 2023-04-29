const mongoose = require("mongoose")
const jwt = require('jsonwebtoken');
const Admin = require("../models/M_admin")
const bcrypt = require('bcrypt');
const { token } = require("morgan");
module.exports = {
 // get admin with async await
    admin: async (req,res)=>{
        try {
            const result = await Admin.find()
            res.status(200).json({
                admin:result,
            })
        } catch (error) {
            res.status(500).json({
                message:"admin not found"
            })
        }

    },
    //create admin_controller
    // loginadmin: (req, res, next) => {
    //     //check admin
    //     Admin.find({ email: req.body.email })
    //         .exec()
    //         .then(result => {
    //             if (result.length >= 1) {
    //                 return res.status(409).json({
    //                     message: "admin exits"
    //                 })
    //             }
    //             else {
    //                 //bcrypt password
    //                 bcrypt.hash(req.body.password, 10, (err, hash) => {
    //                     if (err) {
    //                         return res.status(500).json({
    //                             error: err
    //                         })
    //                     }
    //                     else {
    //                         const admin = new Admin({
    //                             _id: new mongoose.Types.ObjectId(),
    //                             name: req.body.name,
    //                             email: req.body.email,
    //                             password: hash
    //                         })
    //                         admin.save()
    //                             .then(result => {
    //                                 console.log(result);
    //                                 res.status(201).json({
    //                                     message: "admin created",
    //                                 })
    //                                 // res.render("blog")
    //                                 // res.redirect("/blog")
    //                             })
    //                             .catch(err => {
    //                                 console.log(err);
    //                                 res.status(409).json({
    //                                     error: err
    //                                 })
    //                             })
    //                     }
    //                 }

    //                 )
    //             }
    //         })
            
    // },

    //async and awaits
    loginadmin: async (req,res)=>{
        const {name , email ,password} =  req.body
        const admin =  await Admin.findOne({email:email})
        if(admin){
            res.status(500).json({
                message:"email already exits"
            })
        }
        else{
            //create a hash password with the help of bcrypt npm
            const hash_p = await bcrypt.hash(password,10)
            if(name && email && password){
                const result = new Admin({
                    _id: new mongoose.Types.ObjectId(),
                    name:name,
                    email:email,
                    password: hash_p // here we store a hash password
            })
            //generate token
            const token = jwt.sign({adminId : result._id},"A1B10",{ expiresIn:"1h"})
            
            res.status(201).json({
                message:"user created",
                Token:token
            })
            await result.save()
        }
        else{
                res.status(500).json({
                    message:"All field Are required"
                })
            }
        }
    },
//delete admin-controller
    // logoutadmin: (req, res, next) => {
    //     const _id = req.params.adminId;
    //     Admin.deleteOne({ _id }).exec()
    //         .then(result => {
    //             res.status(200).json({
    //                 message: "admin deleted"
    //             })
    //         })
    //         .catch(err => {
    //             res.status(500).json({
    //                 error: err
    //             })
    //         })
    // }

    logoutadmin: async (req,res)=>{
        try {
            const _id = req.params.adminId;
            const result =  await Admin.findByIdAndDelete({_id})
            res.status(200).json({
                message:'admin Delete'
            })
        } catch (error) {
            res.status(500).json({
                error:error
            })
        }
    }
}