var takePictureButton = document.getElementById('take_snapshot');

takePictureButton.addEventListener('click', function () {
    var video = document.getElementById('camera');
    video.style.display = 'inline-block';

    var showButton = document.getElementById('shotButtonWrapper');
    showButton.style.display = 'block';
    var takeShotButton = document.getElementById('takeShot');

    var canvas = document.getElementById('test');
    canvas.width = '350';
    canvas.height = '430';
    var ctx = canvas.getContext('2d');

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

            ctx.drawImage(video, -50, -150);
            document.querySelector('img').src = canvas.toDataURL('image/webp');
            video.style.display='none';
            showButton.style.display='none';
        }
    }

    navigator.getUserMedia(vgaConstraints, function (stream) {
        video.src = window.URL.createObjectURL(stream);
        localMediaStream = stream;
    }, errorCallback);

});