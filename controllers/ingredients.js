const express = require("express");
const ingredientsRouter = express.Router();
const IngredientList= require("../models/ingredients");
const User = require("../models/user");


// / /GET METHOD
ingredientsRouter.get("/", (req, res) => {
    IngredientList.find({}, (err, ingredients) => {
    res.render("ingredients/ingredients.ejs", { 
        ingredients: ingredients });
    });
    });
    
    

//UPDATE
ingredientsRouter.get("/:id/edit", (req, res)=>{
const id = req.params.id;
IngredientList.find({}, (err, ingredients) => {
 res.render("ingredients/edit.ejs", { 
    ingredients: ingredients, 
    idTask: id });
});
})
ingredientsRouter.post((req, res) => {
const id = req.params.id;
IngredientList.findByIdAndUpdate(id, { content: req.body.content }, err => {
if (err) return res.send(500, err);
res.redirect("/ingredients");
});
});



//POST METHOD
ingredientsRouter.post('/',async (req, res) => {
    const ingredientList = new IngredientList({
    content: req.body.content
    });
    try {
    await ingredientList.save();
    res.redirect("/");
    } catch (err) {
    res.redirect("/");
    }
    });


    module.exports = ingredientsRouter