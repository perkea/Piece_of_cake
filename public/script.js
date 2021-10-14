// window.onload = function createList(){
//     var list = document.getElementsByClassName("list");
//     //var li = document.createElement("li");
//     var input = document.getElementsByClassName("ingredients").value;
//     var strComma = input.split(",");
//     console.log(strComma);
//     var i = 0;
//     for (i; i < strComma.length; i++){
//         var el = document.createTextNode(strComma[i]);
//         var li = document.createElement("li");
//         li.appendChild(el);
//         list.appendChild(li);
//     }
// }


function addIngredients() {
    let inputVal = $("input-ingredient").val();
    const ingredient = $(".list-parent").append(`<li class = "list">
{inputVal}</li>`);
inputVal = $("input-ingredient").val("");
}


$(".addIngredients").on("click", addIngredients);
