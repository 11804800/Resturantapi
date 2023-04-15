const mongoose=require('mongoose');
const Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency=mongoose.Types.Currency;

const orderSchema=new Schema({
    price:{
        type:Currency,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    quantity:{
        type:Number
    },
    orderId:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},{
    timestamps:true
});

const Order=mongoose.model('orderSchema',orderSchema);
module.exports=Order;