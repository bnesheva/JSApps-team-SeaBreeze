/**
 * Created by Nick on 26/8/2015.
 */
var ImagesService = require('./ImagesService.js');
var LoadPicModule = require('./load_picture.js');

var DB = require('./DBOperations.js')

// app start point
// Temp
// For test purpose
var Main = (function () {
    var Service = {};

    var db = Object.create(DB).init();
    var userN;

    db.GetImgsByUserId('dbc49940-4bd5-11e5-bcb6-5b2a88304013')
        .success()
        .then(function (data) {
            console.log(data.Result);
        });

    db.GetAllUsers()
        .success()
        .then(function(data) {
            console.log(data.Result);
        });


    db.GetUserById('dbc49940-4bd5-11e5-bcb6-5b2a88304013')
        .success()
        .then(function(data) {
            userN = data.Result.Username;
            console.log(userN)
        });

    Service.main = function() {
        var IS = Object.create(ImagesService).init();

        LoadPicModule;




        var $fileInput = $('<input/>')
            .attr('type', "file")
            .appendTo(document.body);

        $fileInput.on('change', function() {
            IS.UploadImage(this.files[0]);
        });

        //console.log(LoadPicModule);
    };


    return Service;
})();

module.exports = Main;