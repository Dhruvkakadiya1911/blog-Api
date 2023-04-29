const mongoose = require("mongoose");

//create a Blog database
const blogSchema = mongoose.Schema({
    _id: {type:mongoose.Schema.Types.ObjectId},
    title:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId, ref:"Category" , require:true,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    publish_date:{
        type:Date,
        default:Date.now()
    },
    slug:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    }
    
});

module.exports=mongoose.model('Blog',blogSchema)