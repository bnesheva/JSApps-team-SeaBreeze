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
            token,
            FR= new FileReader();

        FR.onload = function() {
            imgData = FR.result.split(',')[1];
            token = localStorage.getItem('currUserToken')
            img = {
                "Filename": inputFile.name,
                "ContentType": inputFile.type,
                "base64": imgData,
                "UserId": userId
            };

            DB.AddImage(img, token)
                .success(function (data) {
                    console.log('Successfully added img: ', data)
                })
                .fail(function(data) {
                    console.log('Failed adding img ', data);
                })
        };

        FR.readAsDataURL(inputFile);
    };

    ImagesService.UploadImageFromData = function(data, userId) {
        var token = localStorage.getItem('currUserToken'),
            imgData = data.split(',')[1],
            imgType = data.split(',')[0].split(';')[0].split(':')[1];

        var img = {
            "Filename": "new photo",
            "ContentType": imgType,
            "base64": imgData,
            "UserId": userId
        };

        DB.AddImage(img, token)
            .success(function (data) {
                console.log('Successfully added img: ', data)
            })
            .fail(function(data) {
                console.log('Failed adding img ', data);
            })
    }

    return ImagesService;
})();

module.exports = ImagesService;