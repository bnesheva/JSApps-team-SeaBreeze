// Resize and position image
//console.log('loaded')
var imageIdCounter = 0;

var images = [];

$('#switch_to_register').on('click', function () {
    console.log('clicked!')
    $('.slideable').addClass('slided');
});
$('#switch_to_login').on('click', function () {
    $('.slideable').removeClass('slided');
})

$('#show_profile').on('hover', function() {
    console.log('dododo')
})

////// fake functionality for the login
//$(document).ready('.welcome_holder h2').on('click', function () {
//    $('#welcome_screen').hide();
//});

///





