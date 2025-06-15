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
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
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
    isCompleted: {
        type: Boolean,
        default: false
      }
},{timestamps:true})

module.exports = mongoose.model('Goal', goalSchema)