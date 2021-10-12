// const mongoose = require('mongoose');
// const ingredientListSchema = new mongoose.Schema({
// content: {
// type: String,
// required: true
// },
// date: {
// type: Date,
// default: Date.now
// }
// })
// module.exports = mongoose.model('IngredientList',ingredientListSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TestSchema = new Schema({
    title: String,
    ingredients: {
        type: Array,
        default: [],
        required: true
    },
}, {
    timestamps: true
});
const TestIngredient2= mongoose.model('TestIngredient2', TestSchema);
module.exports = TestIngredient2;

