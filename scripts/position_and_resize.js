// JavaScript source code
// Resize and position image
console.log('loaded')

var createImage = (function () {
   var $container,
   event_state = {},
   constrain = false,
   min_width = 40,
   min_height = 40,
   max_width = 2700,
   max_height = 2000,
   resize_canvas = document.createElement('canvas'),
   orig_src = new Image;

   createImage = Object.create({ });
    createImage.init = function (image_target) {
        console.log('init started');
        createImage.image_target = $(image_target).get(0);
        orig_src.src = createImage.image_target.src;
        //console.log(orig_src.src);
        $(createImage.image_target).wrap('<div class="resize-container"></div>')
        .before('<span class="resize-handle resize-handle-nw"></span>')
        .before('<span class="resize-handle resize-handle-ne"></span>')
        .after('<span class="resize-handle resize-handle-se"></span>')
        .after('<span class="resize-handle resize-handle-sw"></span>');

        // Get a variable for the container
        $container = $(createImage.image_target).parent('.resize-container');

        // Add events
       // $container.on('mousedown touchstart', '.resize-handle', createImage.startResize);
       // $container.on('mousedown touchstart', 'img', createImage.startMoving);
        return this;
    };

    createImage.startResize = function (e) {
        e.preventDefault();
        e.stopPropagation();
        createImage.saveEventState(e);
        $(document).on('mousemove touchmove', createImage.resizing);
        $(document).on('mouseup touchend', createImage.endResize);
    };

    createImage.endResize = function (e) {
        e.preventDefault();
        $(document).off('mouseup touchend', createImage.endResize);
        $(document).off('mousemove touchmove', createImage.resizing);
    };

    createImage.saveEventState = function (e) {

        console.log($container);
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
    }


    createImage.resizing = function (e) {
        var mouse = {}, width, height, left, top, offset = $container.offset();
        mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
        mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

        // Position image differently depending on the corner dragged and constraints
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
            createImage.resizeImage(width, height);
            // Without this Firefox will not re-calculate the the image dimensions until drag end
            $container.offset({ 'left': left, 'top': top });
        }
    }
    createImage.resizeImage = function (width, height) {
        resize_canvas.width = width;
        resize_canvas.height = height;
        resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);
        $(createImage.image_target).attr('src', resize_canvas.toDataURL("image/png"));
    };
    createImage.startMoving = function (e) {
        e.preventDefault();
        e.stopPropagation();
        createImage.saveEventState(e);
        $(document).on('mousemove touchmove', createImage.moving);
        $(document).on('mouseup touchend', createImage.endMoving);
    };

    createImage.endMoving = function (e) {
        e.preventDefault();
        $(document).off('mouseup touchend', createImage.endMoving);
        $(document).off('mousemove touchmove', createImage.moving);
    };

    createImage.moving = function (e) {
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
            createImage.resizeImage(width, height);
        }
    };



    //final return
    return createImage;

}());

function loadPhoto(img) {
    //resizeableImage2.init(img);
    console.log('click')
}
var chosenPhoto = '.resize-image'
$(document).on('click', '#load_photo', function () {
    createImage.init(chosenPhoto);
    $('.resize-container').removeClass('selected');
    var $outer = $(chosenPhoto).parent('.resize-container');
    $outer.addClass('selected');
});
$(document).on('click', '#share_picture', function () {
    createImage.init('.resize-image2');
    $('.resize-container').removeClass('selected');
    var $outer = $(chosenPhoto).parent('.resize-container');
    $outer.addClass('selected');
});
$(document).on('click', '.resize-container img', function () {
    $('.resize-container').removeClass('selected');
    var $outer = $(this).parent('.resize-container');
    $outer.addClass('selected');
});
$(document).on('click', '#position_image', function () {
   // $container.on('mousedown touchstart', '.resize-handle', createImage.startResize);
    $('.resize-container.selected').on('mousedown touchstart', 'img', createImage.startMoving);
});


