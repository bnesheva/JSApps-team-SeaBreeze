var ImagesService = require('./ImagesService.js');


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
        IS.UploadImage($fileInput[0].files[0]);
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
            console.log(picURL);
            var globalCanvas = document.getElementById("test");
            globalCanvas.width = 700;
            globalCanvas.height = 500;
            var ctx = globalCanvas.getContext("2d");

            var photo = new Image();
            photo.onload = function () {
                ctx.drawImage(photo, 0, 10, 700, 400);
            };

            photo.src = picURL;
        }
    }
})();

module.exports = LoadPic;