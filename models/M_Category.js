const mongoose = require("mongoose");

//create a category database
const categorySchema = mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId},
    category:{
        type:String,
        required:true
    },
});

module.exports=mongoose.model('Category',categorySchema)