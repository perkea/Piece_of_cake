const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: String,
    intro: String,
    preparation_time: Number,
    cook_time: Number,
    image: String,
    ingredients: {
        type: Array,
        default: [],
        required: true
    },

    directions: [String],
    user: {
        //this type property is set to an Mongoose Obgect
        type: Schema.Types.ObjectId,
        //this id wll reference an object from the author collection
        ref: "User"
    }
}, {
    timestamps: true
});





const Recipe = mongoose.model('Recipe', recipeSchema);


module.exports = Recipe;