'use strict'

// Get data from JSON API using async/await and add to the dropdow.
const getCountries = async () => {
    const countriesUrl = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    const countries = await countriesUrl.json();
    const countryList = countries;
    //console.log(countries);
    countries.meals.forEach(country => {
        let option = document.createElement('option')
        option.value = country.strArea
        option.innerText = country.strArea
        document.getElementById('cuisine').appendChild(option)
    })
}
getCountries();


//add event listener to the button
var go = document.getElementById("go")
// go.addEventListener('click', async () => {
//     let country = document.getElementById("cuisine").value;
//     const mealsUrl = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
//     const meals = await mealsUrl.json();
//     console.log(meals)})


// Display list of recipes, Post recipes to the DOM
const getAllRecipes = async (recipe) => {
    console.log(recipe)
    const recipesUrl = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${recipe}`);
    const allRecipes = await recipesUrl.json();
    console.log(allRecipes)
    console.log(document.getElementById("cuisine").value)
    var deleteSection = document.getElementsByClassName('home-imageCuisine')[0];
    deleteSection.innerHTML = "";
    var recipe
    for (let i = 0; i < 7; i++) {
        recipe = allRecipes.meals[i]
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="container-fluid">
        <div class="row d-flex justify-content-around" id="recipe-list-container">
        </div>
      </div>
      <div class="card m-3">
        <img src="${recipe.strMealThumb}" class="card-img-top" alt="Photo of ${recipe.strMeal}">
        <div class="card-body">
          <h5 class="card-title burbank text-md">${recipe.strMeal}</h5>
        </div>
        <form>
          <input type="number" value="${recipe.idMeal}" class="invisible"></input>
          <div class="card-footer text-center"><button type="submit" class="btn bg-lettuce burbank text-white"
              onclick="getRecipeId(event)">Let's make it!</button>
            <div>
        </form>
      </div>
          `;
        //console.log(deleteSection)
        deleteSection.appendChild(div);

    }
    //console.log(allRecipes);
}
go.addEventListener('click', () => getAllRecipes(document.getElementById("cuisine").value))



//Get 'ID' of the Recipe
const getId = async (idValue) => {

    const recipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idValue}`);
    const data = await recipe.json();
    const x = data.meals[0];
    //console.log(x);
   // console.log(document.getElementsByClassName("home-imageCuisine"));
    var deleteSection = document.getElementsByClassName('home-imageCuisine')[0];
    deleteSection.innerHTML = "";
    let div = document.createElement('div');
    
    let htmlTexto = `<div class="container mt-3">
    <div class="row" id="main-div">
      <div class="col-12 border rounded">
        <div class="row pt-3">
          <div class="col-lg-6 col-md-6 col-sm-12">
          <img class="card-img-top rounded" src="${x.strMealThumb}" alt="Photo of ${x.strMeal}">
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12">
            <h5 class="burbank text-md">${x.strCategory}</h5><div class="row">
    <div class="col-12" id="badges"></div>
  </div>
</div>
</div>
<div class="row">
<div class="col-12 pt-3">
  <h5 class="burbank text-md">Ingredients</h5>
  <ul id="recipe-ingredients">`;
  console.log(x)
let propiedades = Object.keys(x);

for (const property in x) {  
    console.log(property + ': ' + x[property]);
    //if (property.contain("Ingredient")) {
        htmlTexto = htmlTexto + `<h5 class="burbank text-md">` + x[property] + `</h5>`;
    //} else {
        // no hacer nada
    //}
   
    
}
  htmlTexto = htmlTexto + `</ul> 
  </div>
  </div>
  </div>
  </div>
  </div>
  `;


//console.log(htmlTexto);
    div.innerHTML = htmlTexto;
   
    //console.log("Se ha creado la pagina")
    deleteSection.appendChild(div);
   
    //console.log("obtenido" + getIdUrl);
    //const ids = await getIdUrl.json();
    //const idList = ids
    //let idLink = ids.meals.idMeal
    //or let idLink = country[2] ?

    // Display choosen recipe (como passar o valor de 'let idLink'?)

   
    
}

