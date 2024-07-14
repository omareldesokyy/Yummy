export class Api{

    async getMealsByName(nameKey){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameKey}`);
        return await response.json();
    }

    async getMealsByFirstLetter(letterKey){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letterKey}`);
        return await response.json();
    }

    async getMealDetails(id){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        return await response.json();
    }

    async getMealsCategories(){
        let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        return await response.json();
    }

    async getMealsByCategory(category){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        return await response.json();
    }

    async getMealsIngredients(){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
        return await response.json();
    }

    async getMealsByIngredient(ingredient){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        return await response.json();
    }

    async getAreas(){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
        return await response.json();
    }

    async getMealsByArea(area){
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
        return await response.json();
    }

}