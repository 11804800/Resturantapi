const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const commentSchema=new Schema({
    comment:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    dish:
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'dishesSchema'
    }
},{
    timestamps:true
});

const Comment=mongoose.model('commentSchema',commentSchema);
module.exports=Comment;