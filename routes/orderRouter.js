const express = require('express');
const orderRouter = express.Router();
const bodyparser = require('body-parser');
const Order = require('../models/orders');
const authenticate=require('../authenticate');
orderRouter.use(bodyparser.json());

orderRouter.route('/')
    .get((req, res, next) => {
        Order.find(req.query)
        .populate('user')
            .then((order) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(order);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser,(req, res, next) => {
        if(req.body !=null)
        {
            req.body.user=req.user._id;
            Order.create(req.body)
            .then((order)=>{
                Order.findById(order._id)
                .populate('user')
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(order);
            },(err) => next(err))
            .catch((err)=>next(err));
        }
    })
    .delete((req,res,next)=>{
        Order.remove(req.query)
        .then((resp)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(resp);
        },(err)=>next(err))
        .catch((err)=>next(err));
    });

module.exports = orderRouter;