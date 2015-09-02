var ImagesService = require('./services/ImagesService.js');
var imageAddings = require('./services/imageAddings.js');

var takePicture = (function () {

    var takePictureButton = document.getElementById('take_snapshot'),
        $saveButton = $('#save_image_button');

    IS = Object.create(ImagesService).init();

    $saveButton.on('click', function () {
        IS.UploadImage($fileInput[0].files[0], localStorage.getItem('currUserID'));
    });

    takePictureButton.addEventListener('click', function () {

        var video = document.getElementById('camera'),
            $showButton = $('#shotButtonWrapper'),
            $takeShotButton = $('#takeShot'),
            canvas = $('<canvas/>'),
            localMediaStream = null,
            vgaConstraints = {
                video: {
                    mandatory: {
                        maxWidth: 600,
                        maxHeight: 750
                    }
                }
            },
            errorCallback = function (e) {
                console.log('Rejected!', e);
            };

        canvas[0].width = '450';
        canvas[0].height = '430';
        canvas.css('display', 'none');
        video.style.display = 'inline-block';
        $showButton.css('display', 'inline-block');
        $takeShotButton.on('click', snapshot);

        // working cross-browser
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

        function snapshot() {
            if (localMediaStream) {

                var ctx = canvas[0].getContext('2d');
                ctx.drawImage(video, -100, -50);

                imageAddings.addPhoto(canvas[0].toDataURL('image/webp'));
                video.style.display = 'none';
                $showButton.css('display', 'none');
            }
        }

        navigator.getUserMedia(vgaConstraints, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            localMediaStream = stream;
        }, errorCallback);
    });
}());

module.exports = takePicture;
