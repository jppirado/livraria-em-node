const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Book =  new Schema({
  title:{
    type:String
  },
  author:{
    type:String
  },
  category:{
    type:String
  },
  url:{
    type:String
  }
})

mongoose.model('books' , Book)

