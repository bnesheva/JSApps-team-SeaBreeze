var imageAddings = require('./services/imageAddings.js');

var takePicture = (function () {

    var takePictureButton = document.getElementById('take_snapshot')

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
        canvas.css('display','none');
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

                var picSrc = canvas[0].toDataURL('image/webp');
                imageAddings.addPhoto(picSrc);
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
