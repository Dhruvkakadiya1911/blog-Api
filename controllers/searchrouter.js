const mongoose = require("mongoose")
const Blog = require("../models/M_allblog");

//search title
module.exports = {
  getblog: async (req, res, next) => {
    try {
      const blogs = await Blog.find()
        .select('-__v')
        .populate('category', 'category')
      res.status(200).json(blogs)
    } catch (error) {
      res.status(500).json({
        error: error
      })
    }

  },

  search_router: async (req, res, next) => {
    const search = await Blog.find({
      "$or": [
        {
          "title": { $regex: req.params.search, $options: "i" },
          // "Description": { $regex: req.params.search, $options: "i" }
        }
      ]
    })
    res.status(200).json({
      message:"search",
      result:search
    })
  }
}