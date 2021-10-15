//////////////////////////////////////////function to add ingredients/////////////////////////////////////////////////////////////////////////////
function addIngredients() {
    let inputVal = $(".input_ingredient").val();
    const ingredient = $(".list_parent").append(` <li class = "list"><input type = "text" name = "ingredients" value = "${inputVal}"/></li>`);
    inputVal = $(".input_ingredient").val("");
}

$(".add_ingredients").on("click", addIngredients);


////////////////////////////////////////////function to add Directions/////////////////////////////////////////////////////////////////////////
function addDirections() {
    let inputVal = $(".input_directions").val();
    const ingredient = $(".list_parent_direction").append(` <li class = "list"><input type = "text" name = "directions" value = "${inputVal}"/></li>`);
    inputVal = $(".input_directions").val("");
}



$(".add_directions").on("click", addDirections);