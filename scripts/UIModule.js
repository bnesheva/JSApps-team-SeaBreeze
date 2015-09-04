/**
 * Created by Nick on 2/9/2015.
 */

var DB = require('./DBOperations.js');
var ImagesService = require('./services/ImagesService.js');
var UserServices = require('./services/UserServices.js');

var UIModule = (function () {
    $('.welcome_holder h2').on('click', function () {
        $('#welcome_screen').hide();
    });

    $('#showLoginBtn').on('click', function () {
        $('#welcome_screen').show();
    });

    if (ifLoggedIn()) {
        $('#welcome_screen').hide();
        $('#show_profile').text('Hey, ' + localStorage.getItem('currUserName'));
    }

    if (!ifLoggedIn()) {
        $('#show_profile').text('Hey, you are not logged in yet.');
    }

    $('#testBtn').on('click', function () {
        DB.GetAllImages(localStorage.getItem('currUserToken'))
            .then(function (data) {
                var imgs = data.Result;
                console.log(imgs)
            })
    });

    $('#logInButt').on('click', function () {
        var username = $('#logInUsernameInput').val();
        var password = $('#logInPasswordInput').val();
        UserServices.loginUser(username, password);
        $('#welcome_screen').hide();
        UserServices.welcomeCurrentUser(localStorage.getItem('currUserID'))
    });

    $('#logoutBtn').on('click', function () {
        UserServices.logOutUser();
        localStorage.setItem('currUserToken', null);
        $('#show_profile').text('Hey, you are not logged in yet.');
    });

    $('#registerButt').click(function () {
        var username = $('#registerUsernameInput').val();
        var password = $('#registerPasswordInput').val();
        UserServices.createUser(username, password);
    });

    function ifLoggedIn() {
        return localStorage.getItem('currUserToken') != '' + null;
    }
})();
module.exports = UIModule;