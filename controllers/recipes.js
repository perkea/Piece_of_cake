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
            recipes: foundRecipes,
            tabTitle: 'Recipe Gallery',
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
 //////////////////////////// Delete////////////////////////////////////////////////////
recipesRouter.delete("/:id", (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, data) => {
      console.log("selected id", req.params.id);
      console.log("this is the error", err);
      console.log("this is the deleted item", data);
      res.redirect("/recipes")
    })
  })

 ///////////////////////////////// Update//////////////////////////////////////
recipesRouter.put("/:id", (req, res) => {
  if (req.body.completed === "on") {
    req.body.completed = true
  } else {
    req.body.completed = false
  }
console.log('update req.body', req.params.id, req.body);
  Recipe.findByIdAndUpdate(
    req.params.id,
    req.body, {
      new: true, // returns the document after the update
    },
    (error, updatedRecipe) => {
console.log('after update', updatedRecipe);
      res.redirect(`/recipes/${req.params.id}`)
    }
  )
})

/////////////////////////////// Create/////////////////////////////
recipesRouter.post('/', (req, res) => {
    console.log(req.body)
    if (req.body.completed === "on") {
        req.body.completed = true;
      } else {
        req.body.completed = false;
      }
    // This Article is now expecting an author property
   Recipe.create(req.body, (err, createdRecipe) => {
        res.redirect('/recipes');
    });
});

//////////////////////////////////// Edit////////////////////////////////////////////////
recipesRouter.get("/:id/edit", (req, res) => {
    Recipe.findById(req.params.id, (error, foundRecipe) => {
      res.render("recipes/edit.ejs", {
       recipe: foundRecipe,
       tabTitle: 'Edit a Recipe'
      })
    })
  })
///////////////////////////////////Show/////////////////////////

recipesRouter.get("/:id", (req, res) => {
           Recipe.findById(req.params.id, (error, foundRecipe) => {
                res.render('recipes/show.ejs', {
                    recipe: foundRecipe,
                    tabTitle: 'Recipe',
                    
                });
            })
            Recipe.findById(req.params.id).populate('user').exec((err, foundRecipe) => {
                console.log(foundRecipe)
                res.render('recipes/show.ejs', {
                    recipe: foundRecipe,
                    tabTitle: 'Recipe',
                })
            })

        });


module.exports = recipesRouter