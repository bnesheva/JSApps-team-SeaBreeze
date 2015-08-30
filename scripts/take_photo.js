var takePictureButton = document.getElementById('take_snapshot');

takePictureButton.addEventListener('click', function () {
    var video = document.getElementById('camera');
    video.style.display = 'inline-block';

    var showButton = document.getElementById('shotButtonWrapper');
    showButton.style.display = 'inline-block';

    var takeShotButton = document.getElementById('takeShot');

    var canvas = document.getElementById('test');
    canvas.width = '450';
    canvas.height = '430';
    canvas.style.display = 'none';

    var localMediaStream = null;
    var vgaConstraints = {
        video: {
            mandatory: {
                maxWidth: 600,
                maxHeight: 750
            }
        }
    };

    var errorCallback = function (e) {
        console.log('Reeeejected!', e);
    };

    takeShotButton.addEventListener('click', snapshot, false);

// working cross-browser
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    function snapshot() {
        if (localMediaStream) {

            var ctx = canvas.getContext('2d');
            ctx.drawImage(video, -100, -50);

            var picSrc = canvas.toDataURL('image/webp');
            imageAddings.addPhoto(picSrc);
            video.style.display = 'none';
            showButton.style.display = 'none';
        }
    }

    navigator.getUserMedia(vgaConstraints, function (stream) {
        video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;
    }, errorCallback);
});