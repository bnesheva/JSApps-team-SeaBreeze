var ImagesService = require('./services/ImagesService.js');

var LoadPic = (function LoadPic() {
    var loadedPictureBtn = $('#load_photo'),
        $fileInput = $("<input/>").attr('type', 'file'),
        $saveButton = $('#save_image_button');

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

    function makeImagesDisappear() {
        var images = $('img');
        for (var i = 0, len = images.length; i < len; i += 1) {
            images[i].style.display= 'none';
        }
    }

    function picChange(event) {

   //     makeImagesDisappear();
        var fileInput = event.target.files;

        if (fileInput.length > 0) {

            var windowURL = window.URL || window.webkitURL;
            var picURL = windowURL.createObjectURL(fileInput[0]);

            //console.log(picURL);
            imageSrc = picURL;

            var globalCanvas = document.getElementById("test");
            globalCanvas.width = 700;
            globalCanvas.height = 500;
            var ctx = globalCanvas.getContext("2d");

            var photo =document.createElement('img');
            photo.src = picURL;

            photo.onload = function () {
                ctx.drawImage(photo, 0, 10, 700, 400);
            };
        }
    }
})();

module.exports = LoadPic;