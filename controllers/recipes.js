const express = require("express");
const recipesRouter = express.Router();
const Recipe = require("../models/recipe");
const RecipeSeed = require("../models/recipeSeed");
const User = require("../models/user");

////////////////////////Seed route////////////////////////////////////
recipesRouter.get("/seed", (req, res) => {
    Recipe.deleteMany({}, (error, allRecipes) => {
  
    })
   Recipe.create(recipeSeed, (error, data) => {
      res.redirect("/recipes");
    });
  });

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
   User.find({}, (err, foundUsers) => {
        res.render('recipes/new.ejs', {
             users: foundUsers
        });
    })
 });

/////////////////////////////// Create/////////////////////////////
recipesRouter.post('/', (req, res) => {
    console.log(req.body)
    // This Article is now expecting an author property
   Recipe.create(req.body, (err, createdRecipe) => {
        res.redirect('recipes');
    });
});

///////////////////////////////////Show/////////////////////////

recipesRouter.get("/:id", (req, res) => {
           Recipe.findById(req.params.id, (error, foundRecipe) => {
                res.render('recipes/show.ejs', {
                    recipe: foundRecipe
                });
            })
            Recipe.findById(req.params.id).populate('user').exec((err, foundRecipe) => {
                console.log(foundRecipe)
                res.render('recipes/show.ejs', {
                    recipe: foundRecipe
                })
            })

        });


module.exports = recipesRouter