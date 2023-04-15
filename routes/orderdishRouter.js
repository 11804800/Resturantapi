const expres=require('express');
const bodyparser=require('body-parser');
const DishOrder=require('../models/orderDish');
const orderdishRouter=expres.Router();
orderdishRouter.use(bodyparser.json());

orderdishRouter.route('/')
.get((req,res,next)=>{
    DishOrder.find(req.query)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    DishOrder.create(req.body)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete((req,res,next)=>{
    DishOrder.remove(req.query)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});

orderdishRouter.route('/:id')
.get((req,res,next)=>{
    DishOrder.findById(req.params.id)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    DishOrder.findByIdAndUpdate(req.params.id,{
       $set:req.body 
    },{new:true})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete((req,res,next)=>{
    DishOrder.findByIdAndRemove(req.params.id)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});



module.exports=orderdishRouter;