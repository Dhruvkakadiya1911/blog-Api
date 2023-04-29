const mongoose = require("mongoose");

//create a Admin database
const adminSchema = mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId},
    name :{type:String, required:true},
    email:{type:String ,required: true, unique:true, match:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/},
    password:{type:String, required:true}
});

module.exports=mongoose.model('Admin',adminSchema)