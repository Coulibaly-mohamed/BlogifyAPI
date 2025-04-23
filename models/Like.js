import mongoose from 'mongoose'

const LikeSchema = new mongoose.Schema(
    {
        Commentid: { type: int, required: true, unique: true },
        userId : { type: int, required: true, unique: true }//link to user  

    },
    { timestamps: true }
)

export default mongoose.model('LikeSchema', LikeSchema )
