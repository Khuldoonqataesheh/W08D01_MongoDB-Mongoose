const mongoose =require("mongoose");

const todoSchema = new mongoose.Schema({
    task:{type:String, required:true, unique:true},
    description:{type:String, required:true},
    deadline:{type:string},
    isCompleted:{type:Boolean, required:true},
    priority:{type:String}
})

module.exports = mongoose.model("todo",todoSchema)
