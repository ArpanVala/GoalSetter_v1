const mongoose  = require('mongoose')

const goalSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    goal:{
        type:String,
        required:[true, 'Please enter a goal']
    },
    category:{
        type:String,
        default:'Personal'
    },
    priority:{
        type:String,
        enum:['High', 'Medium', 'Low'],
        default:'Low'
    },
    dueDate:{
        type:Date,
        required:[true, 'Please enter a due date']
    },
},{timestamps:true})

module.exports = mongoose.model('Goal', goalSchema)