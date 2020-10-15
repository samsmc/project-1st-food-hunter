const getCountries = async () => {
    const countriesUrl = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    const countries = await countriesUrl.json();
    const countryList = countries;
    console.log(countries);
    countries.meals.forEach(country => {
      let option = document.createElement('option')
      option.value = country.strArea
      option.innerText = country.strArea
      document.getElementById('cuisine').appendChild(option)
    })
  }
  getCountries();
    var go = document.getElementById("go")
    go.addEventListener('click', async ()=>{
        let country = document.getElementById("cuisine").value;
        const mealsUrl = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`)
        const meals = await mealsUrl.json();
        console.log(meals)
    })

    