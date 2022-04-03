const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const storySchema = new Schema({
    title:{type:String,required:[true,'title is req']},
    author:{type:String,required:[true,'author is req']},
    content:{type:String,required:[true,'content is req'],minlength:[10,'min 10 chars are needed']}, 
},{timestamps:true});


module.exports=mongoose.model('Story',storySchema)