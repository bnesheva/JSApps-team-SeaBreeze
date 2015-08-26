var loadedPictureBtn = $('#load_photo');
var fileInput = $("#fileInput");

loadedPictureBtn.on('click', function () {
    fileInput.click();
});

function makeImagesDisappear() {
    var images = $('img');
    for (var i = 0, len = images.length; i < len; i += 1) {
        images[i].style.display= 'none';
    }
}

function picChange(event) {

    makeImagesDisappear();
    var fileInput = event.target.files;

    if (fileInput.length > 0) {

        var windowURL = window.URL || window.webkitURL;
        var picURL = windowURL.createObjectURL(fileInput[0]);
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