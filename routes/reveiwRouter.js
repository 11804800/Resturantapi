const express = require('express');
const reveiwRouter = express.Router();
const bodyparser = require('body-parser');
const Reveiw = require('../models/reveiw');
reveiwRouter.use(bodyparser.json());
const cors = require('./cors');
const authenticate = require('../authenticate');

reveiwRouter.route('/')
    .get(cors.cors, (req, res, next) => {
        Reveiw.find({})
            .populate('author')
            .then((comment) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(comment);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        if (req.body != null) {
            req.body.author = req.user._id;
            Reveiw.create(req.body)
                .then((comment) => {
                    Reveiw.findById(comment._id)
                        .populate('author')
                        .then((comment) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(comment);
                        })
                }, (err) => next(err))
                .catch((err) => next(err));
        }
    })
    .put((req, res) => {
        res.statusCode = 300;
        res.send("Can't Perform Update Right Now");
    })
    .delete((req, res, next) => {
        Reveiw.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('content-type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = reveiwRouter;
