/**
 * Created by Nick on 26/8/2015.
 */
var ImagesService = require('./services/ImagesService.js');
var UserServices = require('./services/UserServices.js');
var LoadPicModule = require('./load_picture.js');
var DB = require('./DBOperations.js');

// app start point
// Temp
// For test purpose
var Main = (function () {
    var Service = {};
        
        Service.main = function() {
            var IS = Object.create(ImagesService).init();

            LoadPicModule;

            UserServices.createUser('HAHAHO','kek');





            var $fileInput = $('<input/>')
                .attr('type', "file")
                .appendTo(document.body);

            $fileInput.on('change', function() {
                IS.UploadImage(this.files[0]);
            });
    };

    return Service;
})();

module.exports = Main;