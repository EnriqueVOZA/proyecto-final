const { Schema, model } = require("mongoose")

const postSchema = new Schema({

    title: String,
    text: String, 
    image: {
        type: String,
        default: 'https://res.cloudinary.com/carolinavitale/image/upload/v1626707015/rose_bnaxpj.jpg'
    },
    review: [{
        type: Schema.Types.ObjectId,
        ref: 'Review',
    }],
    owner: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }]
},
    {
        timestamps: true,
    })

const Post = model("Post", postSchema)

module.exports = Post
