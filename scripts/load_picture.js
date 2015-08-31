var ImagesService = require('./services/ImagesService.js');
var imageAddings = require('./services/imageAddings.js');

var LoadPic = (function LoadPic() {
    var loadedPictureBtn = $('#load_photo'),
        $saveButton = $('#save_image_button'),
        $fileInput = $("<input/>").attr('type', 'file');

    IS = Object.create(ImagesService).init();

    loadedPictureBtn.on('click', function () {
        $fileInput.click();
    });

    $fileInput.on('change', function (e) {
        picChange(e)
    });

    $saveButton.on('click', function () {
        IS.UploadImage($fileInput[0].files[0], 'dbc49940-4bd5-11e5-bcb6-5b2a88304013');
    });

    function picChange(event) {

        var fileInput = event.target.files;

        if (fileInput.length > 0) {
            var windowURL = window.URL || window.webkitURL;
            var picURL = windowURL.createObjectURL(fileInput[0]);
            imageAddings.addPhoto(picURL);
        }
    }
})();

module.exports = LoadPic;