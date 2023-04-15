const express = require('express');
const bodyparser = require('body-parser');
const Dishes = require('../models/dishes');
const { response } = require('express');
const dishRouter = express.Router();
dishRouter.use(bodyparser.json());


dishRouter.route('/')
    .get(async (req, res) => {
        try{
        const page = parseInt(req.query.page) - 1 || 0;
        const limit = parseInt(req.query.limit) || 8;
        let category = req.query.category || "All";
        let Menu = req.query.Menu || "All";
        const search = req.query.search || "";
        const categoryOptions = [
            "Veg",
            "Non-Veg",
            "Milk",
            "Lemon"
        ];
        const categoryOptions2 = [
            "Dinner",
            "Drink",
            "Desert",
            "Breakfast",
            "Lunch"
        ];
        category === "All"
            ? (category = [...categoryOptions])
            : (category = req.query.category.split(","));

        Menu === "All" ? (Menu = [...categoryOptions2]) : (Menu = req.query.Menu.split(","));

       const total=await Dishes.find({ name: { $regex: search, $options: "i" } })
       .where("category.Foodcategory")
       .in([...category])
       .where("category.Menucategory")
       .in([...Menu])
       .countDocuments();

       const dish=await Dishes.find({ name: { $regex: search, $options: "i" } })
            .where("category.Foodcategory")
            .in([...category])
            .where("category.Menucategory")
            .in([...Menu])
            .skip(page * limit)
            .limit(limit);
            const response={
                total,
                dish
            }
            res.status(200).json(response);
    }
    catch(err)
    {
        res.status(500).send(err);
    }
    })
    .post((req, res, next) => {
        Dishes.create(req.body)
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put((req, res) => {
        res.statusCode = 300;
        res.send("Right Now! I can't perform it for you");
    })
    .delete((req, res, next) => {
        Dishes.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

dishRouter.route("/subCategory")
    .get(async (req, res) => {
        try{
            const page = parseInt(req.query.page) - 1 || 0;
            const limit = parseInt(req.query.limit) || 8;
            let category = req.query.category || "All";
            const categoryOptions = [
                "Pasta",
                "Pizza",
                "Desert",
                "Drink",
                "Bowl",
                "Wrap",
                "Salad"
            ];
            category === "All"
                ? (category = [...categoryOptions])
                : (category = req.query.category.split(","));
    
            const total=await Dishes.find({})
            .where("category.subCategory")
            .in([...category])
            .countDocuments();

            const dish=await Dishes.find({})
                .where("category.subCategory")
                .in([...category])
                .skip(page * limit)
                .limit(limit);

            const response={
                total:total,
                dish
            }
            res.status(200).json(response);
        }
        catch(err)
        {
            res.status(500).send(err);
        }
    });

dishRouter.route('/category')
    .get((req, res, next) => {
        Dishes.find({})
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


dishRouter.route('/:id')
    .get((req, res, next) => {
        Dishes.findById(req.params.id)
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 300;
        res.send("Right Now! I can't perform it for you");
    })
    .put((req, res, next) => {
        Dishes.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Dishes.findByIdAndRemove(req.params.id)
            .then((dish) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(dish);
            }, (err) => next(err))
            .catch((err) => next(err));
    });


module.exports = dishRouter;