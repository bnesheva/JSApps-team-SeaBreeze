// Resize and position image
//console.log('loaded')
var images = [];
var resizeableImage = (function () {
   // console.log('created');
    var $container,
        orig_src = new Image(),
        event_state = {},
        constrain = false,
        min_width = 40, 
        min_height = 40,
        max_width = 1800,
        max_height = 1900,
        resize_canvas = document.createElement('canvas');

    function getTargetImg(className) {
        var len = $('.' + className).length;
        return $('.' + className).get(len - 1);
    }

    var resizeableImage = Object.create({});
    resizeableImage.init = function (src, className) {

        var imageLoaded = '<img class="' + className + '" src="' + src + '"/>'
        $('main .container-fluid').append(imageLoaded);

        resizeableImage.name = className
        resizeableImage.image_target = getTargetImg(className);
          //  $('.' + className).get(0);
        // When resizing, we will always use this copy of the original as the base
        orig_src.src = resizeableImage.image_target.src;

        // Wrap the image with the container and add resize handles
        $(resizeableImage.image_target).wrap('<div class="resize-container"></div>')
        .before('<span class="resize-handle resize-handle-nw"></span>')
        .before('<span class="resize-handle resize-handle-ne"></span>')
        .after('<span class="resize-handle resize-handle-se"></span>')
        .after('<span class="resize-handle resize-handle-sw"></span>');

        // Assign the container to a variable
        $container = $(resizeableImage.image_target).parent('.resize-container');

        // Add events
        $container.on('mousedown touchstart', '.resize-handle', resizeableImage.startResize);
        $container.on('mousedown touchstart', 'img', resizeableImage.startMoving);
        //$('.js-crop').on('click', resizeableImage.crop);

        return this;
    };

    resizeableImage.saveEventState = function (e) {
        // Save the initial event details and container state
        event_state.container_width = $container.width();
        event_state.container_height = $container.height();
        event_state.container_left = $container.offset().left;
        event_state.container_top = $container.offset().top;
        event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
        event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

        // This is a fix for mobile safari
        // For some reason it does not allow a direct copy of the touches property
        if (typeof e.originalEvent.touches !== 'undefined') {
            event_state.touches = [];
            $.each(e.originalEvent.touches, function (i, ob) {
                event_state.touches[i] = {};
                event_state.touches[i].clientX = 0 + ob.clientX;
                event_state.touches[i].clientY = 0 + ob.clientY;
            });
        }
        event_state.evnt = e;
        return event_state;
    };

    resizeableImage.startResize = function (e) {
        e.preventDefault();
        e.stopPropagation();
        resizeableImage.saveEventState(e);
        console.log(event_state);
        $(document).on('mousemove touchmove', resizeableImage.resizing);
        $(document).on('mouseup touchend', resizeableImage.endResize);
    };

    resizeableImage.endResize = function (e) {
        e.preventDefault();
        $(document).off('mouseup touchend', resizeableImage.endResize);
        $(document).off('mousemove touchmove', resizeableImage.resizing);
    };

    resizeableImage.resizing = function (e) {
        //console.log(event_state);
        var mouse = {},
            width,
            height,
            left,
            top,
            offset = $container.offset();
        mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
        mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

        // Position image differently depending on the corner dragged and constraints
        console.log(event_state)
        if ($(event_state.evnt.target).hasClass('resize-handle-se')) {
            width = mouse.x - event_state.container_left;
            height = mouse.y - event_state.container_top;
            left = event_state.container_left;
            top = event_state.container_top;
        } else if ($(event_state.evnt.target).hasClass('resize-handle-sw')) {
            width = event_state.container_width - (mouse.x - event_state.container_left);
            height = mouse.y - event_state.container_top;
            left = mouse.x;
            top = event_state.container_top;
        } else if ($(event_state.evnt.target).hasClass('resize-handle-nw')) {
            width = event_state.container_width - (mouse.x - event_state.container_left);
            height = event_state.container_height - (mouse.y - event_state.container_top);
            left = mouse.x;
            top = mouse.y;
            if (constrain || e.shiftKey) {
                top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
            }
        } else if ($(event_state.evnt.target).hasClass('resize-handle-ne')) {
            width = mouse.x - event_state.container_left;
            height = event_state.container_height - (mouse.y - event_state.container_top);
            left = event_state.container_left;
            top = mouse.y;
            if (constrain || e.shiftKey) {
                top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
            }
        }

        // Optionally maintain aspect ratio
        if (constrain || e.shiftKey) {
            height = width / orig_src.width * orig_src.height;
        }

        if (width > min_width && height > min_height && width < max_width && height < max_height) {
            // To improve performance you might limit how often resizeImage() is called
            resizeableImage.resizeImage(width, height);
            // Without this Firefox will not re-calculate the the image dimensions until drag end
            $container.offset({ 'left': left, 'top': top });
        }
        console.log('resize')
        console.log($container);
    }

    resizeableImage.resizeImage = function (width, height) {
        console.log('now resizing ' + width + ' ' + height);
        console.log(resize_canvas);
        resize_canvas.width = width;
        resize_canvas.height = height;
        resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);
        $(resizeableImage.image_target).attr('src', resize_canvas.toDataURL("image/png"));
    };

    resizeableImage.startMoving = function (e) {
        e.preventDefault();
        e.stopPropagation();
        resizeableImage.saveEventState(e);
        $(document).on('mousemove touchmove', resizeableImage.moving);
        $(document).on('mouseup touchend', resizeableImage.endMoving);
        console.log(event_state);
    };

    resizeableImage.endMoving = function (e) {
        e.preventDefault();
        $(document).off('mouseup touchend', resizeableImage.endMoving);
        $(document).off('mousemove touchmove', resizeableImage.moving);
    };

    resizeableImage.moving = function (e) {
        var mouse = {}, touches;
        e.preventDefault();
        e.stopPropagation();

        touches = e.originalEvent.touches;

        mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft();
        mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();
        $container.offset({
            'left': mouse.x - (event_state.mouse_x - event_state.container_left),
            'top': mouse.y - (event_state.mouse_y - event_state.container_top)
        });
        // Watch for pinch zoom gesture while moving
        if (event_state.touches && event_state.touches.length > 1 && touches.length > 1) {
            var width = event_state.container_width, height = event_state.container_height;
            var a = event_state.touches[0].clientX - event_state.touches[1].clientX;
            a = a * a;
            var b = event_state.touches[0].clientY - event_state.touches[1].clientY;
            b = b * b;
            var dist1 = Math.sqrt(a + b);

            a = e.originalEvent.touches[0].clientX - touches[1].clientX;
            a = a * a;
            b = e.originalEvent.touches[0].clientY - touches[1].clientY;
            b = b * b;
            var dist2 = Math.sqrt(a + b);

            var ratio = dist2 / dist1;

            width = width * ratio;
            height = height * ratio;
            // To improve performance you might limit how often resizeImage() is called
            resizeableImage.resizeImage(width, height);
        }
        console.log('move')
        console.log($container);
    };

    /*resizeableImage.crop = function () {
        //Find the part of the image that is inside the crop box

        var crop_canvas,
            left = $('.overlay').offset().left - $container.offset().left,
            top = $('.overlay').offset().top - $container.offset().top,
            width = $('.overlay').width(),
            height = $('.overlay').height();

        crop_canvas = document.createElement('canvas');
        crop_canvas.width = width;
        crop_canvas.height = height;

        crop_canvas.getContext('2d').drawImage(resizeableImage.image_target, left, top, width, height, 0, 0, width, height);
        window.open(crop_canvas.toDataURL("image/png"));
    }
    */


    //final return
    return resizeableImage;

}());

//resizeableImage.init($('.resize-image'));
//resizeableImage1($('.resize-image'));

//to ge the url from the loader but not working...
function getSelectedImageURL(url) {
    return chosenPhotoURL = url;
}

var imageAddings = {
    addPhoto: function () {
        removeImage('photo');
        if ($('.resize-container').hasClass('photo')) {
            $('.resize-container.photo').remove();
        }
        var photo = (function (parent) {
            var photo = Object.create(parent, {});

            photo.init = function (chosenPhoto, className) {
                parent.init.call(this, chosenPhoto, className);
            };

            return photo;
        }(resizeableImage));

        photo.init(chosenPhoto, 'photo');

        $('.resize-container').removeClass('selected');
        var $outer = $(imgSelector).parent('.resize-container');
        $outer.addClass('photo selected');

        images.push(photo);

    }
}

function removeImage(name) {
    var removed = $.grep(images, function (e) {
        return e.name != name;
    });
    images = removed;
}


//temp vars to test
var chosenPhoto = 'images/test_photo.jpg';
var imgSelector = 'img[src$="test_photo.jpg"]';
var chosenPhoto2 = 'images/star.png';
var imgSelector2 = 'img[src$="star.png"]'


$(document).on('click', '#load_photo', imageAddings.addPhoto);
$(document).on('click', '#add_sticker', function () { //will move it to imageAddings object when done
    var sticker = (function (parent) {
        var sticker = Object.create(parent, {});

        sticker.init = function (chosenPhoto, className) {
            parent.init.call(this, chosenPhoto, className);
        };

        return sticker;
    }(resizeableImage));

   sticker.init(chosenPhoto2, 'sticker');

    $('.resize-container').removeClass('selected');
    var $outer = $(imgSelector2).parent('.resize-container');
    $outer.addClass('sticker selected');

    images.push(sticker);

});

//hide canvas
$('.test').hide();


