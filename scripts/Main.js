/**
 * Created by Nick on 26/8/2015.
 */
var stickerThumbnails = require('./templates/stickerThumbnails.js');
var imageEditor = require('./templates/imageEditor.js');
var welcomeScreen = require('./templates/welcomeScreen.js');
var toolbar = require('./templates/toolbar.js');
var ImagesService = require('./services/ImagesService.js');
var UserServices = require('./services/UserServices.js');
var LoadPicModule = require('./load_picture.js');
var TakePictureModeule = require('./take_photo.js');
var resizeableImage = require('./services/resizeableImage.js');
var imageAddings = require('./services/imageAddings.js');
var DB = require('./DBOperations.js');

// app start point
// Temp
// For test purpose
var Main = (function () {

    var Service = {};
        
        Service.main = function() {
            var IS = Object.create(ImagesService).init();

            LoadPicModule;
            TakePictureModeule;

            $('#logoutButton').on('click', function() {
                UserServices.logOutUser();
            });

            $('#testButton').on('click', function() {
                DB.GetAllImages(localStorage.getItem('currUserToken'))
                    .then(function (data) {
                        var imgs = data.Result;
                        console.log(imgs)
                    })
            });

            $('#logInButt').on('click', function() {
                var username = $('#logInUsernameInput').val();
                var password = $('#logInPasswordInput').val();
                UserServices.loginUser(username, password);
            });

            $('#registerButt').click(function() {
                var username = $('#registerUsernameInput').val();
                var password = $('#registerPasswordInput').val();
                UserServices.createUser(username, password);
            })

            var $fileInput = $('<input/>')
                .attr('type', "file")
                .appendTo(document.body);

            $fileInput.on('change', function() {
                IS.UploadImage(this.files[0]);
            });
        };

    ///////////////////////////////////////// Real Functionality
        var loggedToFB = false;

        $('.sticker_thumbnail').on('click', imageAddings.addSticker);



    /////// cropping
        crop = function () {

            var crop_canvas, left, top, imgToDrawSrc, toGet, imgToDraw, widthToDraw, heightToDraw, i,
                len = images.length,
                width = $('.overlay').width(),
                height = $('.overlay').height();

            if (len > 0) {
                crop_canvas = document.createElement('canvas');
                crop_canvas.width = width;
                crop_canvas.height = height;

                for (i = 0; i < len; i += 1) {
                    imgToDrawSrc = images[i].image;
                    if (images[i].containerLeft !== undefined) {
                        left = $('.overlay').offset().left - images[i].containerLeft;
                        top = $('.overlay').offset().top - images[i].containerTop;
                    }
                    else {
                        left = -width / 2;
                        top = -height / 2;
                    }
                    widthToDraw = images[i].containerWidth;
                    heightToDraw = images[i].containerHeight;
                    toGet = $("img[src='" + imgToDrawSrc + "']").length;
                    imgToDraw = $("img[src='" + imgToDrawSrc + "']").get(toGet - 1);
                    crop_canvas.getContext('2d').drawImage(imgToDraw, left, top, width, height, 0, 0, width, height);
                }

                var imgToAppend = crop_canvas.toDataURL("image/png");

                console.log(imgToAppend);

                ImagesService.UploadImageFromData(imgToAppend);
                /*
                var newWindow = window.open();
                $(newWindow.document.body).append('hello')
                .append('<img src="' + imgToAppend + '" width="300" height="300" />')
                */

            }
            else {
                alert('load image to procceed');
            }
            createPopupToShare(imgToAppend);

            $('#fb_share').on('click', publishStream);
        };

    //// end crop

        function createPopupToShare(img) {
            if (img === undefined) {
                alert('create image to share');
                throw new Error('create image to share');
            }
            var fbLogin = $('#to_detach').detach();
            var popupToShare =
                $('main').append('<div id="popup_to_share"><div class="container">' +
                '<button type="button" class="close"><span class="glyphicon glyphicon-remove"></span></button>' +
                '<h2>Share your incredible development skills with the world!</h2>' +
                '<h4>If you want all of this or even more to become true - start learning today at <a href="http://telerikacademy.com/" target="_blank">Telerik Academy!</a></h4>' +
                '<div class="row"><img id="img_to_share" src="' + img + '" width="300" height="300" /></div>' +
                '<div class="row"><div class="col-sm-4 fbLoginContainer" >Please login/change permission to Facebook ' +
                '<fb:login-button scope="public_profile,email,publish_actions" onlogin="checkLoginState();"></fb:login-button></div>' +
                '<div class="col-sm-4"><button id="fb_share" class="btn btn-default">Post on Facebook</button></div>' +
                '<div class="col-sm-4"><button id="save_local" class="btn btn-default">Download image</button></div></div></div>');
            var downloadLink = $('#save_local').wrap('<a id="downloadImg" download="You as dev guru" href="' + $('#img_to_share').attr('src') + '"></a>');
            $('.fbLoginContainer').append(fbLogin);
            console.log(loggedToFB);
            if (loggedToFB) {
                $('#fbLoginContainer').addClass('hidden');
            }
            $('#popup_to_share .close').on('click', function () {
                $('#popup_to_share').remove();
            });
        }

        function dataURItoBlob(b64Data) {
            var byteCharacters = atob(b64Data);
            var byteNumbers = new Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }

            var ia = new Uint8Array(byteNumbers);
            var blob = new Blob([ia], { type: 'image/png' });

            return blob;
        }





        function publishStream() {
            var img = $('#img_to_share').attr('src');
            console.log(img);
            var str64 = (img).split('base64,')[1];
            console.log(str64);
            var blobForFB = dataURItoBlob(str64);

            var blobUrl = URL.createObjectURL(blobForFB);
            console.log(blobForFB);

            var accessToken = "";

            FB.getLoginStatus(function (response) {
                if (response.status === 'connected') {
                    var uid = response.authResponse.userID;
                    accessToken = response.authResponse.accessToken;
                    console.log(accessToken);
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
            var blob = blobForFB;

            var fd = new FormData();
            fd.append("access_token", accessToken);
            fd.append("source", blob);
            fd.append("message", "I just gained new dev skills! Try it yourself with Dev For A Day! If you want all of this and even more to become true - start learning in Telerik Academy!");

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
                        alert('Please login to facebook and give required permissins');
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


        var testToken;

        $(document).ready(function () {

            FB.init({
                appId: '398097427052792',
                cookie: true,
                xfbml: true,
                status: true
            });
           // console.log('this works1');


            FB.getLoginStatus(function (response) {
             //   console.log('this works');
                if (response.authResponse) {
                    $('#AccessToken').val(response.authResponse.accessToken);
                    console.log('logged');
                    testToken = response.authResponse.accessToken;
                    loggedToFB = true;
                } else {
                    // do something...maybe show a login prompt
                   // console.log('do something');
                }
                console.log(testToken);
            });


        });
        

        $('#share_picture').on('click', crop);
        $('#reset').on('click', function () {
            window.location.reload()
        });

    return Service;
})();

module.exports = Main;