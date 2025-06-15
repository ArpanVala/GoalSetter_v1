const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a category name'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });    

module.exports = mongoose.model('Category', categorySchema);