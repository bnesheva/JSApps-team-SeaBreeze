/**
 * Created by Nick on 26/8/2015.
 */

var DBOperations = require('../DBOperations.js');

var ImagesService = (function () {
    var ImagesService = {},
        DB;
    
    ImagesService.init = function() {
        DB = Object.create(DBOperations).init();
        return this;
    };

    ImagesService.UploadImage = function(inputFile, userId) {
        var img,
            imgData,
            FR= new FileReader();

        FR.onload = function() {
            imgData = FR.result.split(',')[1];

            img = {
                "Filename": inputFile.name,
                "ContentType": inputFile.type,
                "base64": imgData,
                "UserId": userId
            };

            DB.AddImage(img);
        };

        FR.readAsDataURL(inputFile);
    };


    return ImagesService;
})();

module.exports = ImagesService;