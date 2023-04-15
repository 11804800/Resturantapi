const express=require('express');
const commentRouter=express.Router();
const bodyparser=require('body-parser');
const Comment=require('../models/comments');
commentRouter.use(bodyparser.json());
const cors=require('./cors');
const authenticate=require('../authenticate');

commentRouter.route('/')
.get(cors.cors,(req,res,next)=>{
    Comment.find({})
    .populate('author')
    .then((comment)=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(comment);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{
    if(req.body!=null)
    {
        req.body.author=req.user._id;
        Comment.create(req.body)
        .then((comment)=>{
            Comment.findById(comment._id)
            .populate('author')
            .then((comment)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(comment);
            })
        },(err)=>next(err))
        .catch((err)=>next(err));
    }
})
.put((req,res)=>{
    res.statusCode=300;
    res.send("Can't Perform Update Right Now");
})
.delete((req,res,next)=>{
    Comment.remove({})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});



commentRouter.route('/:id')
.get((req,res,next)=>{
    Comment.findById(req.params.id)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete((req,res,next)=>{
    Comment.findByIdAndDelete(req.params.id)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.json(resp);
    },(err)=>next(err))
    .catch((err)=>next(err));
});
module.exports=commentRouter;
