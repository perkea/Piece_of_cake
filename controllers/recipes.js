const express = require("express");
const recipesRouter = express.Router();
const Recipe = require("../models/recipe");
const User = require("../models/user");
const isAuthenticated = require("../utils/auth");
const recipeSeed = require("../models/recipeSeed");

// ////////////////////////Seed route////////////////////////////////////
recipesRouter.get("/test", (req, res) => {
    Recipe.find({
        title: "Strawberry Chia Delite"
    }).populate('user').exec((error, foundRecipes) => {
        res.send("done");
    });
})

recipesRouter.get("/seed", (req, res) => {
    Recipe.deleteMany({}, (error, allRecipes) => {
        Recipe.create(recipeSeed, (error, data) => {
            res.redirect("/recipes");
        });
    });

});
//////////////////////////Index/////////////////////////////////////////////////////////////////////////////
recipesRouter.get("/", isAuthenticated, (req, res) => {
    Recipe.find({}, (error, foundRecipes) => {
        res.render("recipes/index.ejs", {
            recipes: foundRecipes,
            tabTitle: 'Recipe Gallery',
        });
    });
});

///////////////////////////////New///////////////////////////////////////////////////////////////////////
recipesRouter.get('/new', isAuthenticated, (req, res) => {
    res.render('recipes/new.ejs', {
        tabTitle: "Add a new Recipe",
    });
});
//////////////////////////// Delete////////////////////////////////////////////////////////////////////////////
recipesRouter.delete("/:id", isAuthenticated, (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/recipes")
    })
})

///////////////////////////////// Update///////////////////////////////////////////////////////////////////
recipesRouter.put("/:id", isAuthenticated, (req, res) => {
    if (req.body.completed === "on") {
        req.body.completed = true
    } else {
        req.body.completed = false
    }
    Recipe.findByIdAndUpdate(
        req.params.id,
        req.body, {
            new: true,
        },
        (error, updatedRecipe) => {
            res.redirect(`/recipes/${req.params.id}`)
        }
    )
})

/////////////////////////////// Create/////////////////////////////////////////////////////////////////////
recipesRouter.post('/', isAuthenticated, (req, res) => {
    if (req.body.completed === "on") {
        req.body.completed = true;
    } else {
        req.body.completed = false;
    }

    Recipe.create(req.body, (err, createdRecipe) => {

        res.redirect('/recipes');
    });
});


//////////////////////////////////// Edit////////////////////////////////////////////////
recipesRouter.get("/:id/edit", isAuthenticated, (req, res) => {
    Recipe.findById(req.params.id, (error, foundRecipe) => {
        res.render("recipes/edit.ejs", {
            recipe: foundRecipe,
            tabTitle: 'Edit a Recipe'
        })
    })
})
///////////////////////////////////Show/////////////////////////

recipesRouter.get("/:id", isAuthenticated, (req, res) => {
    Recipe.findById(req.params.id).populate('user').exec((err, recipe) => {
        res.render('recipes/show.ejs', {
            recipe: recipe,
            tabTitle: 'Recipe',
        })
    })

});

module.exports = recipesRouter