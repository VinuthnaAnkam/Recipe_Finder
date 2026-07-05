const sw=document.getElementById("switch");
const slider=document.querySelector(".slider");

const veg=document.getElementById("vegLabel");
const nonVeg=document.getElementById("nonVegLabel");

let vegMode=true;

sw.addEventListener("click",function(){

    if(vegMode){

        slider.style.left="33px";
        sw.style.background="#e74c3c";

        veg.style.color="#777";
        nonVeg.style.color="#e74c3c";

    }
    else{

        slider.style.left="3px";
        sw.style.background="#27ae60";

        veg.style.color="#27ae60";
        nonVeg.style.color="#777";

    }

    vegMode=!vegMode;

});
const searchBtn = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const recipeContainer = document.getElementById("recipeContainer");

searchBtn.addEventListener("click", searchRecipe);

searchInput.addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        searchRecipe();
    }
});

async function searchRecipe(){

    const recipe = searchInput.value.trim();

    if(recipe===""){
        alert("Please enter a recipe name.");
        return;
    }

    recipeContainer.innerHTML="<h3>Loading...</h3>";

    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`
    );

    const data = await response.json();

    recipeContainer.innerHTML="";

    if(data.meals==null){

        recipeContainer.innerHTML="<h2>No recipes found.</h2>";
        return;
    }

    data.meals.forEach(meal=>{

        recipeContainer.innerHTML += `

        <div class="card">

            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">

            <div class="card-content">

                <h3>${meal.strMeal}</h3>

                <p>🍽 Category : ${meal.strCategory}</p>

                <p>🌍 Area : ${meal.strArea}</p>

                <button onclick="window.open('${meal.strSource || meal.strYoutube}','_blank')">
                    View Recipe
                </button>

            </div>

        </div>

        `;

    });

}