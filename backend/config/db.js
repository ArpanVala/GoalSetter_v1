const mongoose = require('mongoose');

const connectDB = async()=> {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log('database Connected...')
    }
    catch(error){
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}
module.exports = {connectDB}