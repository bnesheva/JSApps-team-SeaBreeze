// JavaScript source code
var resizeableImage = require('./resizeableImage.js');


var imageAddings = (function () {

    var imageAddings = {
        addPhoto: function (picUrl) {
            console.log('start photo')
           // imageAddings.removeImage('photo');
            if ($('.resize-container').hasClass('photo')) {
              //  $('.resize-container.photo').remove();
            }
            var photo = (function (parent) {
                var photo = Object.create(parent, {});

                photo.init = function (chosenPhoto, className) {
                    parent.init.call(this, chosenPhoto, className);
                };

                return photo;
            }(resizeableImage));

            photo.init(picUrl, 'photo');

            $('.resize-container').removeClass('selected');
            var selector = imageAddings.splitUrl(picUrl);
            var $outer = $(selector).parent('.resize-container');
            $outer.addClass('photo selected');

            console.log(photo);
            photo.name = 'photo';
            photo.containerId = $outer.attr('id');
            photo.image = picUrl;
            images.push(photo);
            console.log(images);

        },
        addSticker: function () {
            if (images.length < 30) {
                $('.sticker_thumbnail').removeClass('selected');
                $(this).addClass('selected');
                var src = imageAddings.getStickerUrl();
                var sticker = (function (parent) {
                    var sticker = Object.create(parent, {});

                    sticker.init = function (chosenPhoto, className) {
                        parent.init.call(this, chosenPhoto, className);
                    };

                    return sticker;
                }(resizeableImage));

                sticker.init(src, 'sticker');

                $('.resize-container').removeClass('selected');


                var selector = imageAddings.splitUrl(src);
                var $outer = $(selector).parent('.resize-container');
                $outer.addClass('sticker selected');

                console.log(sticker)
                sticker.name = 'sticker';
                sticker.containerId = $outer.attr('id');
                sticker.image = src;
                images.push(sticker);
                console.log(images);
            } else {
                alert('You added more than enough stickers already! Some people may decide you overrate your dev abilities ..');
            }
        },
        ///helpers
        removeImage: function (name) {
            var removed = $.grep(images, function (e) {
                return e.name != name;
            });
            images = removed;
        },
        getStickerUrl: function () {
            if ($('.sticker_thumbnail.selected').length > 0) {
                var img = $('.sticker_thumbnail.selected').find('img').get(0);
                var src = $(img).attr('src');
                return src;
            }
        },

        splitUrl: function (url) {
            var splittedUrl = url.split('/');
            var filename = splittedUrl[splittedUrl.length - 1];
            return 'img[src$="' + filename + '"]'
        }
    };

//final return
return imageAddings;

}());

module.exports = imageAddings;