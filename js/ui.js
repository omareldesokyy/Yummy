import { Api } from "./api.js";
const api = new Api();
let meals = [];
let categories = [];
let areas = [];
let ingredients = [];

export class Ui {

    constructor() {
        this.displayMealsByName('', this.displayMealDetails);
    }

    sideNavBar() {
        let left = $('.nav-tabs').outerWidth(true);
        let aside = $('aside').offset().left;

        if (aside == 0) {
            $('aside').animate({ 'left': `-${left}px` }, 600);
            for (let i = 0; i < 5; i++) {
                $(".nav-item").eq(i).animate({
                    'top': `${$('.nav-items').outerHeight(true)}px`
                }, 600)
            }
            $('.nav-btn').addClass('fa-bars');
            $('.nav-btn').removeClass('fa-xmark');
        }
        else {
            $('aside').animate({ 'left': `0px` }, 600);
            for (let i = 0; i < 5; i++) {
                $(".nav-item").eq(i).animate({
                    'top': 0
                }, (i + 5) * 110)
            }
            $('.nav-btn').removeClass('fa-bars');
            $('.nav-btn').addClass('fa-xmark');
        }
    }

    displayMealDetails() {
        $('.meal').each(function (index) {
            $(this).on('click', () => {
                $('.loading').fadeIn(300 , async () =>{
                    const uiInst = new Ui();

                    let meal = (await api.getMealDetails(meals[index].idMeal)).meals[0];
    
                    let ingredients = ``
                    let tags = ``
    
                    for (let i = 1; i < 20; i++) {
                        if (meal[`strIngredient${i}`]) {
                            ingredients += `<span class="ingredient bg-green-200 text-green-800 px-2 py-1 rounded-md">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</span>`
                        }
                    }
    
                    if (meal[`strTags`]) {
                        for (let i = 0; i < meal[`strTags`].split(',').length; i++) {
                            tags += `<span class="ingredient bg-red-200 text-red-800 px-2 py-1 rounded-md">${meal[`strTags`].split(',')[i]}</span>`
                        }
                    }
    
                    $('#detailsArea').html(
                        `
                            <div>
                                <img class="rounded-md" src="${meal.strMealThumb}" alt="${meal.strMeal} img">
                                <h3 class="text-3xl font-medium text-white">${meal.strMeal}</h3>
                            </div>
                            <div class="col-span-2 text-white">
                                <h3 class="text-2xl font-bold">Instructions</h3>
                                <p class="text-md">${meal.strInstructions}</p>
                                <p class="text-xl"><span class="text-xl font-bold">Area:</span> ${meal.strArea}</p>
                                <p class="text-xl"><span  class="text-xl font-bold">Category:</span> ${meal.strCategory}</p>
                                <span class="text-2xl font-bold">Recipes:</span>
                                <div class="my-3 flex flex-wrap gap-4">
                                    ${ingredients}
                                </div>
                                <span class="font-bold text-2xl" >Tags:</span>
                                <div class="my-3 flex flex-wrap gap-3">
                                    ${tags}
                                </div>
                                <div class="my-5">
                                    <a target="_blank" href="${meal.strSource}" class="border border-green-400 bg-transparent text-green-400 px-4 py-2 rounded hover:bg-green-400 hover:text-black transition-all" >Source</a>
                                    <a target="_blank" href="${meal.strYoutube}" class="border border-red-400 bg-transparent text-red-400 px-4 py-2 rounded hover:bg-red-400 hover:text-black transition-all">Youtube</a>
                                </div>
                            </div>
                    `)
                    uiInst.showDetails();
                    $('.loading').fadeOut(300);
                });
                

            })
        })
    }

    displayMealsByName(name, callback) {
        $('.loading').fadeIn(300,async () => {
            meals = (await api.getMealsByName(name)).meals;
            if (meals == null) {
                $('#displayArea').html('<h5 class="font-medium text-white text-3xl px-2">0 Results</h5>')
                $('.loading').fadeOut(300);
            }
            else {
                let arr = meals.map((meal) => {
                    return `
                            <div class="meal overflow-hidden relative group rounded-md cursor-pointer">
                                <img class="w-full" src="${meal.strMealThumb}" alt="${meal.strMeal} img">
                                <div class="group-hover:top-0 overflow-hidden absolute duration-700 bg-opacity-80 top-full w-full h-full flex items-center bg-white">
                                    <h5 class="font-medium text-3xl px-2">${meal.strMeal}</h5>
                                </div>
                            </div>`})
    
                $('#displayArea').html(arr.join(''));
    
                callback();
                $('.loading').fadeOut(300);
            }
        });
    }

    displayMealsByFirstLetter(letter, callback) {

        $('.loading').fadeIn(300,async ()=>{
            meals = (await api.getMealsByFirstLetter(letter)).meals;
            if (meals == null) {
                $('#displayArea').html('<h5 class="font-medium text-white text-3xl px-2">0 Results</h5>')
                $('.loading').fadeOut(300);
            }
            else {
                let arr = meals.map((meal) => {
                    return `
                            <div class="meal overflow-hidden relative group rounded-md cursor-pointer">
                                <img class="w-full" src="${meal.strMealThumb}" alt="${meal.strMeal} img">
                                <div class="group-hover:top-0 overflow-hidden absolute duration-700 bg-opacity-80 top-full w-full h-full flex items-center bg-white">
                                    <h5 class="font-medium text-3xl px-2">${meal.strMeal}</h5>
                                </div>
                            </div>`})
    
                $('#displayArea').html(arr.join(''));
    
                callback();
            }
            $('.loading').fadeOut(300);
        });
       

    }

    displayMealsCategories(callback) {
        $('.loading').fadeIn( 300,async ()=>{
            categories = (await api.getMealsCategories()).categories;
            let arr = categories.map((cat) => {
                return `
                <div class="category overflow-hidden relative group rounded-md cursor-pointer">
                    <img class="w-full" src="${cat.strCategoryThumb}" alt="${cat.strCategory} img">
                    <div class="group-hover:top-0 overflow-hidden absolute duration-700 text-center gap-3 pt-4 px-2 bg-opacity-80 top-full w-full h-full flex flex-col items-center bg-white">
                        <h5 class="font-medium text-2xl">${cat.strCategory}</h5>
                        <p class="font-normal text-base">${cat.strCategoryDescription.split(' ').slice(0, 20).join(' ')}</p>
                    </div>
                </div>`})
    
            $('#displayArea').html(arr.join(''));
    
            callback();
            $('.loading').fadeOut(300);
        });
       
    }

    displayMealsByCategory(callback) {
        $('.category').each(function (index) {
            $(this).on('click',  () => {
                $('.loading').fadeIn(300,async()=>{
                    meals = (await api.getMealsByCategory(categories[index].strCategory)).meals;
                    let arr = meals.map((meal) => {
                        return `
                                <div class="meal overflow-hidden relative group rounded-md cursor-pointer">
                                    <img class="w-full" src="${meal.strMealThumb}" alt="${meal.strMeal} img">
                                    <div class="group-hover:top-0 overflow-hidden absolute duration-700 bg-opacity-80 top-full w-full h-full flex items-center bg-white">
                                        <h5 class="font-medium text-3xl px-2">${meal.strMeal}</h5>
                                    </div>
                                </div>`})
    
                    $('#displayArea').html(arr.join(''));
    
                    callback();
                    $('.loading').fadeOut(300);
                });
            })
        })
    }

    displayAreas(callback) {
        $('.loading').fadeIn(300,async () =>{
            areas = (await api.getAreas()).meals;
            let arr = areas.map((area) => {
                return `
                <div class="area text-white text-center cursor-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h5 class="text-2xl">${area.strArea}</h5>
                </div>`})
    
            $('#displayArea').html(arr.join(''));
    
            callback();
            $('.loading').fadeOut(300);
    
        });
    }

    displayMealsByArea(callback) {
        $('.area').each(function (index) {
            $(this).on('click', () => {
                $('.loading').fadeIn(300, async ()=>{
                    meals = (await api.getMealsByArea(areas[index].strArea)).meals;

                    let arr = meals.map((meal) => {
                        return `
                                <div class="meal overflow-hidden relative group rounded-md cursor-pointer">
                                    <img class="w-full" src="${meal.strMealThumb}" alt="${meal.strMeal} img">
                                    <div class="group-hover:top-0 overflow-hidden absolute duration-700 bg-opacity-80 top-full w-full h-full flex items-center bg-white">
                                        <h5 class="font-medium text-3xl px-2">${meal.strMeal}</h5>
                                    </div>
                                </div>`})
    
                    $('#displayArea').html(arr.join(''));
    
                    callback();
                    $('.loading').fadeOut(300);
                });
            })
        })
    }

    displayMealsIngriedent(callback) {
        $('.loading').fadeIn(300,async ()=>{
            ingredients = (await api.getMealsIngredients()).meals
            let arr = ingredients.slice(0, 20).map((ingred) => {
                return `
                <div class="ingriedent text-white text-center space-y-2 cursor-pointer">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h5 class="font-medium text-2xl">${ingred.strIngredient}</h5>
                    <p class="">${ingred.strDescription.split(' ').slice(0, 20).join(' ')}</p>
                </div>`})
            $('#displayArea').html(arr.join(''));
    
            callback();
            $('.loading').fadeOut(300);
        });
    }

    displayMealsByIngriedent(callback) {
        $('.ingriedent').each(function (index) {
            $(this).on('click', async () => {
                $('.loading').fadeIn(300,async ()=>{
                    meals = (await api.getMealsByIngredient(ingredients[index].strIngredient.toLowerCase())).meals;

                    let arr = meals.map((meal) => {
                        return `
                                <div class="meal overflow-hidden relative group rounded-md cursor-pointer">
                                    <img class="w-full" src="${meal.strMealThumb}" alt="${meal.strMeal} img">
                                    <div class="group-hover:top-0 overflow-hidden absolute duration-700 bg-opacity-80 top-full w-full h-full flex items-center bg-white">
                                        <h5 class="font-medium text-3xl px-2">${meal.strMeal}</h5>
                                    </div>
                                </div>`})
    
                    $('#displayArea').html(arr.join(''));
    
                    callback();
                    $('.loading').fadeOut(300);
                });
            })
        })
    }

    showSearch() {
        $('main section').addClass('hidden');
        $('main form').addClass('hidden');
        $('main #search').removeClass('hidden');
    }

    showForm() {
        $('main section').addClass('hidden');
        $('main form').removeClass('hidden');
        $('.searchByFirstLetter').val('');
        $('.searchByName').val('');
    }

    showData() {
        $('main section').addClass('hidden');
        $('main #displayArea').html('');
        $('main form').addClass('hidden');
        $('main #displayArea').removeClass('hidden');
        $('.searchByFirstLetter').val('');
        $('.searchByName').val('');
    }

    showDetails() {
        $('main section').addClass('hidden');
        $('main form').addClass('hidden');
        $('main #detailsArea').removeClass('hidden');
        $('.searchByFirstLetter').val('');
        $('.searchByName').val('');
    }
}