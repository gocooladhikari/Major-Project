const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    type: {
        type: String
    },
    brand: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    comments: [{
        user: {type: String, default: 'Anonymous'},
        comment: {type: String}
        // created_at: new Date()
    }],
    image: {
        type: String
    },
    sort: {
        type: String
    },
    category: {type: String}
})

const Product = mongoose.model('Product', PostSchema)
module.exports = Product