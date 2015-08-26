/**
 * Created by Nick on 26/8/2015.
 */

var DBOperationsService = require('./DBOperationsService.js');

var Main = (function () {

    var Service = {};

    Service.main = function() {
        console.log('Main is running ', DBOperationsService);

        var db = Object.create(DBOperationsService).init();

        var users = db.GetAllImages(function(users) {
            console.log('sadads', users);
        });
    };

    return Service;
})();

var s = Object.create(Main);

console.log(s);

module.exports = Main;