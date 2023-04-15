const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const orderdish = new Schema({
    dish:{
        type:String,
        unique:true
    },
    price:{
        type:Currency
    },
    quantity:{
        type:Currency,
        default:1
    }
}, {
    timestamps: true
});

const DishOrder = mongoose.model('orderdish', orderdish);
module.exports = DishOrder;