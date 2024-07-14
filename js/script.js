import { Ui } from "./ui.js";

const ui =  new Ui();

ui.sideNavBar();

$('.nav-btn').on('click',ui.sideNavBar);

$('.nav-item').on('click',function(){
    if($(this).html() == 'Search'){
        ui.showSearch();
        ui.sideNavBar();
    }
    else if($(this).html() == 'Categories'){
        ui.displayMealsCategories(()=>{
            ui.displayMealsByCategory(ui.displayMealDetails)
        });
        ui.sideNavBar();
        ui.showData();
    }
    else if($(this).html() == 'Area'){
        ui.displayAreas(()=>{
            ui.displayMealsByArea(ui.displayMealDetails)
        });
        ui.sideNavBar();
        ui.showData();
    }
    else if($(this).html() == 'Ingredients'){
        ui.displayMealsIngriedent(()=>{
            ui.displayMealsByIngriedent(ui.displayMealDetails)
        });
        ui.sideNavBar();
        ui.showData();
    }
    else if($(this).html() == 'Contact Us'){
        ui.showForm();
        ui.sideNavBar();
    }
})

$('.searchByName').on('input',function(){
    $('#displayArea').removeClass('hidden');
    if($(this).val()){
        ui.displayMealsByName(`${$(this).val()}`,ui.displayMealDetails);
    }
    else{
        $('#displayArea').addClass('hidden');
    }
})


//regex
$('.searchByFirstLetter').on('input',function(){
    $('#displayArea').removeClass('hidden');
    if($(this).val()){
        ui.displayMealsByFirstLetter(`${$(this).val()}`,ui.displayMealDetails);
    }
    else{
        $('#displayArea').addClass('hidden');
    }
})
$('.nameInput').on('input',function(){
    if(nameValidation()){
        $('.nameAlert').addClass('hidden')
    }
    else{
        $('.nameAlert').removeClass('hidden')
    }
})
$('.emailInput').on('input',function(){
    if(emailValidation()){
        $('.emailAlert').addClass('hidden')
    }
    else{
        $('.emailAlert').removeClass('hidden')
    }
})
$('.phoneInput').on('input',function(){
    if(phoneValidation()){
        $('.phoneAlert').addClass('hidden')
    }
    else{
        $('.phoneAlert').removeClass('hidden')
    }
})
$('.ageInput').on('input',function(){
    if(ageValidation()){
        $('.ageAlert').addClass('hidden')
    }
    else{
        $('.ageAlert').removeClass('hidden')
    }
})
$('.passwordInput').on('input',function(){
    if(passwordValidation()){
        $('.passwordAlert').addClass('hidden')
    }
    else{
        $('.passwordAlert').removeClass('hidden')
    }
})
$('.repasswordInput').on('input',function(){
    if(repasswordValidation()){
        $('.repasswordAlert').addClass('hidden')
    }
    else{
        $('.repasswordAlert').removeClass('hidden')
    }
})

$('form').on('input',()=>{
    if (areAllInputsValid()) {
       $('.submit').prop('disabled',false)
    } else {
        $('.submit').prop('disabled',true)
    }
})

function areAllInputsValid() {
    return nameValidation()&&emailValidation()&&phoneValidation()&&ageValidation()&&passwordValidation()&&repasswordValidation()
}

function nameValidation() {
    return /^[a-zA-Z ]+$/.test($('.nameInput').val())
} 

function emailValidation() {
    return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})$/.test($('.emailInput').val())
}

function phoneValidation() {
    return /^(\+|002){0,1}01[0125][0-9]{8}$/.test($('.phoneInput').val())
}

function ageValidation() {
    return /^(0?[1-9]|[1-9][0-9]|100)$/.test($('.ageInput').val())
}

function passwordValidation() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test($('.passwordInput').val())
}

function repasswordValidation() {
    return $('.passwordInput').val() == $('.repasswordInput').val();
}



