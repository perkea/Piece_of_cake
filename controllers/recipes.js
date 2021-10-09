const express = require("express");
const recipesRouter = express.Router();
const Recipe = require("../models/");
const User = require("../models/");



//////////////////////////Index//////////////////////////
recipesRouter.get("/", (req, res) => {
   Recipe.find({}, (error, foundRecipes) => {
        res.render("recipes/index.ejs", {
            recipes: foundRecipes
        });
    });
});

///////////////////////////////New/////////////////////////
recipesRouter.get('/new', (req, res) => {
   Recipe.find({}, (err, foundRecipes) => {
        res.render('recipes/new.ejs', {
             recipes: foundRecipes
        });
    })
 });

/////////////////////////////// Create/////////////////////////////
recipesRouter.post('/', (req, res) => {
    console.log(req.body)
    // This Article is now expecting an author property
    Recipe.create(req.body, (err, createdRecipe) => {
        res.redirect('/recipes');
    });
});

///////////////////////////////////Show/////////////////////////

recipesRouter.get("/:id", (req, res) => {
           Recipe.findById(req.params.id, (error, foundRecipe) => {
                res.render('articles/show.ejs', {
                    recipe: foundRecipe
                });
            })
            Recipe.findById(req.params.id).populate('author').exec((err, foundRecipe) => {
                console.log(foundRecipe)
                res.render('recipes/show.ejs', {
                    recipe: foundRecipe
                })
            })

        });


module.exports = recipesRouter