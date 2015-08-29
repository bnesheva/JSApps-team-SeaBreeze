/**
 * Created by Nick on 26/8/2015.
 */

var DBOperationsService = (function () {
    
    var DBService = {},
        APIKey = 'MCRY0p2ft7yaDQsu';

    function Exception(msg) {
        this.message = msg;
    }

    DBService.init = function () {
        return this;
    };

    DBService.GetAllUsers = function() {
        return (
            $.ajax({
                type: 'GET',
                url: 'http://api.everlive.com/v1/' + APIKey + '/Users'
            })
        )
    };

    DBService.AddUser = function(user) {
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            dataType: "json",
            url: 'http://api.everlive.com/v1/' + APIKey + '/Users',
            data: JSON.stringify(user),
            success: function(data) {
                console.log('Successfully added user: ' + data);
            },
            error: function(data) {
                throw new Exception('Error in adding user: ' + data);
            }
        });
    };

    DBService.GetAllImages = function() {
        return (
            $.ajax({
                type: 'GET',
                url: 'http://api.everlive.com/v1/' + APIKey + '/Files'
            })
        )
    };

    DBService.AddImage = function(image) {
        $.ajax({
            type: 'POST',
            contentType: "application/json",
            dataType: "json",
            url: 'http://api.everlive.com/v1/' + APIKey + '/Files',
            data: JSON.stringify(image),
            success: function(data) {
                console.log('Successfully added image: ', data);
            },
            error: function(data) {
                throw new Exception('Error in adding image: ' + data);
            }
        });
    };

    DBService.GetUserById = function(userId) {
        return (
            $.ajax({
                url: 'http://api.everlive.com/v1/' + APIKey + '/Users/' + userId,
                type: "GET"
                //headers: {"Authorization" : "Bearer your-access-token-here",
                //    "X-Everlive-Filter" : JSON.stringify(filter) }
                //success: function(data){
                //    alert(JSON.stringify(data));
                //},
                //error: function(error){
                //    alert(JSON.stringify(error));
                //}
            })
        );
    };

    DBService.GetImgsByUserId = function(userId) {
        var filter = { "UserId" : userId };

        return (
            $.ajax({
                url: 'http://api.everlive.com/v1/' + APIKey + '/Files/',
                type: "GET",
                headers: { //"Authorization" : "Bearer your-access-token-here",
                    "X-Everlive-Filter" : JSON.stringify(filter) }
            })
        );
    };

    DBService.DeleteImage = function() {
        'TODO:..'
    };

    DBService.DeleteUser = function() {
        'TODO:'
    };

    return DBService;
})();

module.exports = DBOperationsService;






