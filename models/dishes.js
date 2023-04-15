const mongoose=require('mongoose');
const Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency=mongoose.Types.Currency;

const dishSchema=new Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    category:{
        Foodcategory:{
            type:String,
            required:true
        },
        Menucategory:{
            type:String,
            required:true
        },
        subCategory:{
            type:String,
            required:true
        }
    },
    label:{
        type:String,
        required:true
    },
    price:{
        type:Currency,
        required:true
    },
    featured:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
});

const Dishes=mongoose.model('dishesSchema',dishSchema);
module.exports=Dishes;