/**
 * Created by Nick on 26/8/2015.
 */
var stickerThumbnails = require('./services/stickerThumbnails.js');
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

            UserServices.createUser('HAHAHO','kek');





            var $fileInput = $('<input/>')
                .attr('type', "file")
                .appendTo(document.body);

            $fileInput.on('change', function() {
                IS.UploadImage(this.files[0]);
            });
        };

    ///////////////////////////////////////// Real Functionality


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

                // window.open(crop_canvas.toDataURL("image/png"));

                var imgToAppend = crop_canvas.toDataURL("image/png");
                var newWindow = window.open();
                $(newWindow.document.body).append('hello')
                .append('<img src="' + imgToAppend + '" width="300" height="300" />')


            }
            else {
                alert('load image to procceed');
            }
        };

        $('#crop_image').on('click', crop);
        $('#reset').on('click', function () {
            window.location.reload()
        });

    return Service;
})();

module.exports = Main;