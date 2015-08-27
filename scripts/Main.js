/**
 * Created by Nick on 26/8/2015.
 */
var ImagesService = require('./ImagesService.js');
var LoadPicModule = require('./load_picture.js');

// app start point
// Temp
// For test purpose
var Main = (function () {
    var Service = {};

    Service.main = function() {
        var IS = Object.create(ImagesService).init();

        LoadPicModule;

        var $fileInput = $('<input/>')
            .attr('type', "file")
            .appendTo(document.body);

        $fileInput.on('change', function() {
            console.log(this.files[0]);
            IS.UploadImage(this.files[0]);
        });
    };

    return Service;
})();

module.exports = Main;