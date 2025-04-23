import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
    {
        Commentid: { type: int, required: true, unique: true },
        Postid: { type: int, required: true, unique: true },
        Auteur: { type: String, required: true },
        Comment: { type: String},
        userId : { type: int, required: true, unique: true }//link to user  

    },
    { timestamps: true }
)

export default mongoose.model('Comments', CommentSchema )
