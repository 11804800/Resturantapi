const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const reveiwSchema=new Schema({
    reveiw:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
});

const Reveiw=mongoose.model('reveiwSchema',reveiwSchema);
module.exports=Reveiw;