// Resize and position image
//console.log('loaded')
var imageIdCounter = 0;

var images = [];

$('#switch_to_register').on('click', function () {
    console.log('clicked!')
    $('.slideable').addClass('slided');
});
$('#switch_to_login').on('click', function () {
    $('.slideable').removeClass('slided');
});

////// fake functionality for the login
$(document).ready('.welcome_holder h2').on('click', function () {
    $('#welcome_screen').hide();
});

///


//var byteCharacters = atob(b64Data);
//var byteNumbers = new Array(byteCharacters.length);
//for (var i = 0; i < byteCharacters.length; i++) {
//    byteNumbers[i] = byteCharacters.charCodeAt(i);
//}


function dataURItoBlob(b64Data) {
    //var byteString = window.atob(dataURI);
    var byteCharacters = atob(b64Data);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    var ia = new Uint8Array(byteNumbers);
    var blob = new Blob([ia], { type: 'image/png' });

    return blob;
}



var a = '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';
var blob = dataURItoBlob(a);

var blobUrl = URL.createObjectURL(blob);

//window.location = blobUrl;




function publishStream(img) {
    var accessToken = "";

    FB.getLoginStatus(function (response) {
        if (response.status === 'connected') {
            var uid = response.authResponse.userID;
            accessToken = response.authResponse.accessToken;
        }
        else if (response.status === 'not_authorized') {
            // the user is logged in to Facebook, 
            // but has not authenticated your app
            console.log('not authorized message');
        }
        else {
            // the user isn't logged in to Facebook.
            console.log('not logged message');
        }
    });
    var blob = img;

    /*
    var imageData = img;
    try {
        blob = dataURItoBlob(imageData);
    }
    catch (e) {
        console.log(e);
    }
    */
    var fd = new FormData();
    fd.append("access_token", accessToken);
    fd.append("source", blob);
    fd.append("message", "");

    try {
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + accessToken,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                console.log("success " + data);
            },
            error: function (shr, status, data) {
                console.log("error " + data + " Status " + shr.status);
            },
            complete: function () {
                console.log("Posted to facebook");
            }
        });

    }
    catch (e) {
        console.log(e);
    }
}

$(document).ready(function () {

    FB.init({
        appId: '398097427052792',
        cookie: true,
        xfbml: true,
        status: true
    });
    console.log('this works1');
    

    FB.getLoginStatus(function (response) {
        console.log('this works');
        if (response.authResponse) {
            $('#AccessToken').val(response.authResponse.accessToken);
            console.log('logged');
        } else {
            // do something...maybe show a login prompt
            console.log('do something');
        }
    });


});



$('.navbar-header').on('click', function () {
    console.log('clicked!')
    publishStream(blob);
});