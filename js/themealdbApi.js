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
  deleteSection.style.background = "none";
  let testeDiv = document.createElement('div')
  testeDiv.setAttribute('class','cartas')
  deleteSection.appendChild(testeDiv);
  var recipe
  for (let i = 0; i < 8; i++) {
    recipe = allRecipes.meals[i]
    let div = document.createElement('div');
    div.innerHTML = `
      <div class="card m-3">
        <img src="${recipe.strMealThumb}" class="card-img-top" alt="Photo of ${recipe.strMeal}">
        <div class="">
          <h4 class="burbank text-sm">${recipe.strMeal}</h4>
        </div>
        <form>
          <input type="number" value="${recipe.idMeal}" class="invisible"></input>
          <div class=""><button type="submit" class="btn bg-lettuce burbank text-white"
              onclick="getId(${recipe.idMeal})">Bon Appétit!</button>
            <div>
        </form>
      </div>
          `;
    //console.log(recipe.idMeal)
    //deleteSection.appendChild(div);
    testeDiv.appendChild(div);

  }
  //console.log(allRecipes);
}
go.addEventListener('click', () => getAllRecipes(document.getElementById("cuisine").value))



//Get 'ID' of the Recipe
const getId = async (idValue) => {
  event.preventDefault()

  const recipe = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idValue}`);
  const data = await recipe.json();
  const x = data.meals[0];

  var deleteSection = document.getElementsByClassName('home-imageCuisine')[0];
  deleteSection.innerHTML = "";
  deleteSection.style.background = "none";
  let div = document.createElement('div');
  let instrucciones = x.strInstructions;
  let htmlTexto =
    `
    <div class="container mt-3">
    <div class="row" id="main-div">
      <div class="col-12 border rounded">
        <div class="row pt-3">
          <div class="col-lg-6 col-md-6 col-sm-12">
          <img class="card-img-top rounded" src="${x.strMealThumb}" alt="Photo of ${x.strMeal}">
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12">
            <h5 class="burbank text-md">${x.strMeal}</h5>
            <br>
            <p class="burbank">${x.strArea}: <span class="text-lettuce text-sm">
                ${x.strTags}</span></p>
            <div class="row">
    <div class="col-12" id="badges"></div>
  </div>
</div>
</div>
<div class="row">
<div class="col-12 pt-3">
  <h5 class="burbank text-md">Ingredients</h5>
  <ul id="recipe-ingredients"></ul>
            <h5 class="burbank text-md">How to make it?</h5>
            <br>
            <p>${instrucciones}</p>
            <br>
          </div>
          <p class="burbank">Source: <span class="text-lettuce text-sm">${x.strSource}</span></p>
        </div>
      </div>
    </div>
  </div>`;
  htmlTexto = htmlTexto + `
  <div class="card-footer text-center">
  <button type="submit" id="animation" class="btn bg-lettuce burbank text-white" onclick="window.location.href='cuisineList.html'">Go back</button></div>
  `;

  div.innerHTML = htmlTexto;
  deleteSection.appendChild(div);
  const ingredientDiv = document.querySelector('#recipe-ingredients');
  ingredientDiv.innerHTML = "";
  let ul = document.createElement('ul');
  ul.id = "recipe-ingredients";
  let htmlIngredients = ``;
  let propiedades = Object.keys(x);

  for (const property in x) {

    if (property.includes("Ingredient") && x[property] != ("") && x[property] != null) {
      let ingredientNumber = 0;
      if (property.length == 14) {
        ingredientNumber = property.substring(13, 14);
      } else if (property.length == 15) {
        ingredientNumber = property.substring(13, 15);
      }

      let strMeasure = "strMeasure" + ingredientNumber;

      htmlIngredients = htmlIngredients + `<li>${x[strMeasure] + " " + x[property]}</li>`;
    } else if (property.includes("Measure")) {

    }
  }
  ul.innerHTML = htmlIngredients;
  ingredientDiv.appendChild(ul);

}

