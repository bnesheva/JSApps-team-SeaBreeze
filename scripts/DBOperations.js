/**
 * Created by Nick on 26/8/2015.
 */

var $ = require('https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.js');

var DBOperationsService = (function () {

    var DBService = {},
        APIKey = 'MCRY0p2ft7yaDQsu';

    function Exception(msg) {
        this.message = msg;
    }

    DBService.init = function () {
        return this;
    };

    DBService.GetAllUsers = function (token) {
        return (
            $.ajax({
                type: 'GET',
                url: 'http://api.everlive.com/v1/' + APIKey + '/Users'
                //headers: {"Authorization" : "Bearer " + token}
            })
        )
    };

    DBService.AddUser = function (user) {
        return (
            $.ajax({
                type: 'POST',
                contentType: "application/json",
                dataType: "json",
                url: 'http://api.everlive.com/v1/' + APIKey + '/Users',
                data: JSON.stringify(user)
                //success: function(data) {
                //    console.log('Successfully added user: ', data);
                //},
                //error: function(data) {
                //    throw new Exception('Error in adding user: ', data);
                //}
            })
        )
    };

    DBService.GetAllImages = function (token) {
        return (
            $.ajax({
                type: 'GET',
                url: 'http://api.everlive.com/v1/' + APIKey + '/Files',
                headers: {"Authorization": "Bearer " + token}
            })
        )
    };

    DBService.AddImage = function (image, token) {
        return (
            $.ajax({
                type: 'POST',
                contentType: "application/json",
                dataType: "json",
                url: 'http://api.everlive.com/v1/' + APIKey + '/Files',
                headers: {"Authorization": "Bearer " + token},
                data: JSON.stringify(image)
                //success: function(data) {
                //    console.log('Successfully added image: ', data);
                //},
                //error: function(data) {
                //    throw new Exception('Error in adding image: ' + data);
                //}
            })
        )
    };

    DBService.GetUserById = function (userId) {
        return (
            $.ajax({
                url: 'http://api.everlive.com/v1/' + APIKey + '/Users/' + userId,
                type: "GET"
                //headers: {//"Authorization" : "Bearer your-access-token-here",
                //    "X-Everlive-Filter" : JSON.stringify(filter) }
            })
        );
    };

    DBService.GetImgsByUserId = function (userId, token) {
        var filter = {"UserId": userId};

        return (
            $.ajax({
                url: 'http://api.everlive.com/v1/' + APIKey + '/Files/',
                type: "GET",
                headers: {
                    "Authorization": "Bearer " + token,
                    "X-Everlive-Filter": JSON.stringify(filter)
                }
            })
        );
    };

    DBService.LogInUser = function (user) {
        return (
            $.post('http://api.everlive.com/v1/' + APIKey + '/oauth/token', user)
        )
    };

    DBService.LogOutUser = function (token) {
        return (
            $.ajax({
                type: "GET",
                url: 'http://api.everlive.com/v1/' + APIKey + '/oauth/logout',
                headers: {"Authorization": "Bearer " + token}
            })
        )
    };

    DBService.DeleteImage = function () {
        'TODO:..'
    };

    DBService.DeleteUser = function () {
        'TODO:'
    };

    return DBService;
})();
module.exports = DBOperationsService;