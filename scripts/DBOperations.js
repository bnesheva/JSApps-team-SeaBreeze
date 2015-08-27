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

    DBService.GetAllUsers = function(handleData) {
        return (
            $.ajax({
                type: 'GET',
                url: 'http://api.everlive.com/v1/' + APIKey + '/Users',
                success: function(users) {
                    handleData(users);
                },
                error: function() {
                    throw new Exception('GetAllUsers(): failed');
                }
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
        return $.ajax({
                type: 'GET',
                url: 'http://api.everlive.com/v1/' + APIKey + '/Files',
                //success: function(files) {
                //    var k = function() {
                //        return files
                //    };
                //    return k;
                //},
                //error: function() {
                //    throw new Exception('GetAllImages: failed');
                //}
            })
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

    DBService.DeleteImage = function() {
        'TODO:..'
    };

    DBService.DeleteUser = function() {
        'TODO:'
    };

    return DBService;
})();

module.exports = DBOperationsService;






