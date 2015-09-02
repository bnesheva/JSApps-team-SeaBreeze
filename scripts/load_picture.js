var ImagesService = require('./services/ImagesService.js');
var imageAddings = require('./services/imageAddings.js');

var LoadPic = (function LoadPic() {
    var loadedPictureBtn = $('#load_photo'),
        $saveButton = $('#save_image_button'),
        $fileInput = $("<input/>").attr('type', 'file');

    IS = Object.create(ImagesService).init();

    loadedPictureBtn.on('click', function () {
        $('#camera').css('display', 'none');
        $('#shotButtonWrapper').css('display', 'none');
        $fileInput.click();
    });

    $fileInput.on('change', function (e) {
        picChange(e)
    });


    $saveButton.on('click', function () {
        IS.UploadImage($fileInput[0].files[0], localStorage.getItem('currUserID'));
    });

    function picChange(event) {

        var fileInput = event.target.files;

        if (fileInput[0].type === 'image/jpeg') {
            if (fileInput.length > 0) {
                var windowURL = window.URL || window.webkitURL;
                var picURL = windowURL.createObjectURL(fileInput[0]);
                console.log(fileInput);
                imageAddings.addPhoto(picURL);
            }
        } else {
            alert('You can load only pictures!');
        }
    }
})();

module.exports = LoadPic;