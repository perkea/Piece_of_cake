const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: String,
    preparation_time: Number,
    cook_time: Number,
    image: String,
    ingredients: String,
    directions: String,
    body: String,
    user: {
        //this type property is set to an Mongoode Obgect
        type: Schema.Types.ObjectId,
        //this id wll reference an object from the author collection
        ref: "User"
    }
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;