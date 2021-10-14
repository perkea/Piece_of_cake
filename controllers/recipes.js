const express = require("express");
const recipesRouter = express.Router();
const Recipe = require("../models/recipe");
const User = require("../models/user");
const isAuthenticated = require("../utils/auth");
const recipeSeed = require("../models/recipeSeed");

// ////////////////////////Seed route////////////////////////////////////
recipesRouter.get("/test", (req, res) => {
    // User.find({}).populate("recipes").then(user =>{
    //     res.json(user);
    //     console.log(user);
    // })})
    // //     // await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec()
    Recipe.find({
        title: "Strawberry Chia Delite"
    }).populate('user').exec((error, foundRecipes) => {

        console.log(foundRecipes);

        res.send("done");
    });


    // Recipe.deleteMany({}, (error, allRecipes) => {

})
// Recipe.create(recipeSeed, (error, data) => {
//     res.redirect("/recipes");
// });


recipesRouter.get("/seed", (req, res) => {
    Recipe.deleteMany({}, (error, allRecipes)=>{
        Recipe.create(recipeSeed, (error, data) => {
            res.redirect("/recipes");
        });
    });
    
});


// /Seed route
// productRouter.get("/seed", (req, res) => {
//   Product.deleteMany({}, (error, allProducts) => {

//   })
//   Product.create(productSeed, (error, data) => {
//     res.redirect("/products");
//   });
// });


// recipesRouter.get("/test/new", (req, res) => {
//     // User.find({}).populate("recipes").then(user =>{
//     //     res.json(user);
//     //     console.log(user);
//     // })})
//     // //     // await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec()
//     Recipe.create({
//         title: "Strawberry Chia Delite",
//         ingredients: ["eggs", "stew", "milk"],
//         directions: ["cook the food", "boil water"],
//         preparation_time: 8,
//         cooking_time: 9,
//         image: "https://cdn.pixabay.com/photo/2013/11/28/04/15/cake-219595__340.jpg"


//     }).populate('user').exec((error, foundRecipes) => {

//         console.log(foundRecipes);

//         res.send("done");
//     });


// Recipe.deleteMany({}, (error, allRecipes) => {



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
    User.find({}, (err, foundUsers) => {
        res.render('recipes/new.ejs', {
            users: foundUsers,
            tabTitle: "Add a new Recipe",
        });
    })
});
//////////////////////////// Delete////////////////////////////////////////////////////////////////////////////
recipesRouter.delete("/:id", isAuthenticated, (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, data) => {
        console.log("selected id", req.params.id);
        console.log("this is the error", err);
        console.log("this is the deleted item", data);
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

/////////////////////////////// Create/////////////////////////////////////////////////////////////////////
recipesRouter.post('/', isAuthenticated, (req, res) => {
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
        console.log(err, recipe)
        res.render('recipes/show.ejs', {
            recipe: recipe,
            tabTitle: 'Recipe',
        })
    })

});


////////////////////// Utility Functions////////////////////
/////////////////////// Auth middleware////////////////////
// function isAuthenticated(req, res, next) {
//     if (!req.session.user) { // user is not logged in
//         return res.redirect('/login');
//     }
//     next(); // user is authenticated, keep moving on to the next step
// }


module.exports = recipesRouter