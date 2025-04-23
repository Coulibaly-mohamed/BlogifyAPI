import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema(
    {
        Postid: { type: int, required: true, unique: true },
        Title: { type: String, required: true, unique: true },
        Content: { type: String, required: true, unique: true },
        Tag: { type: String, unique: true },
        userId : { type: int, required: true, unique: true }//link to user  

    },
    { timestamps: true }
)

export default mongoose.model('Post', PostSchema)
