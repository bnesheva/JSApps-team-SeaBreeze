// JavaScript source code

var resizeableImage = (function () {
    var $container,
        orig_src = new Image(),
        event_state = {},
        constrain = false,
        min_width = 40, 
        min_height = 40,
        max_width = 1800,
        max_height = 1900,
        resize_canvas = document.createElement('canvas');

    orig_src.setAttribute('crossOrigin', 'anonymous');

    function getTargetImg(className) {
        var len = $('.' + className).length;
        return $('.' + className).get(len - 1);
    }

    function getCurrentContainer(id) {
        var len = images.length;
        var i;
        var current;
        if (len > 0) {
            for (i = 0; i < len; i += 1) {
                if (images[i].containerId === id) {
                    current = images[i];
                }
            }
            return current;
        }
        else {
            throw new Error('no images!');
        }
    }

    var resizeableImage = Object.create({});
    resizeableImage.init = function (src, className) {
        var id = imageIdCounter +=1;
        var imageLoaded = '<img class="' + className + '" src="' + src + '"/>'
        $('main .container-fluid').append(imageLoaded);
 
        resizeableImage.image_target = getTargetImg(className);
        orig_src.src = resizeableImage.image_target.src;

        $(resizeableImage.image_target).wrap('<div id="id-' + id + '"class="resize-container"></div>')
        .before('<span class="resize-handle resize-handle-nw"></span>')
        .before('<span class="resize-handle resize-handle-ne"></span>')
        .after('<span class="resize-handle resize-handle-se"></span>')
        .after('<span class="resize-handle resize-handle-sw"></span>');

        $container = $('#id-' + id + '.resize-container');
        $container.on('mousedown touchstart', '.resize-handle', resizeableImage.startResize);
        $container.on('mousedown touchstart', 'img', resizeableImage.startMoving);

        return this;
    };

    resizeableImage.saveEventState = function (e) {
        event_state.container_width = $container.width();
        event_state.container_height = $container.height();
        event_state.container_left = $container.offset().left;
        event_state.container_top = $container.offset().top;
        event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
        event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

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
        $(document).on('mousemove touchmove', resizeableImage.resizing);
        $(document).on('mouseup touchend', resizeableImage.endResize);
    };

    resizeableImage.endResize = function (e) {
        e.preventDefault();
        $(document).off('mouseup touchend', resizeableImage.endResize);
        $(document).off('mousemove touchmove', resizeableImage.resizing);

        var containerId = ($container.attr('id'));      
        var currentContainerObj = getCurrentContainer(containerId);
        currentContainerObj.containerWidth = $container.width();
        currentContainerObj.containerHeight = $container.height();
        currentContainerObj.containerLeft = $container.offset().left;
        currentContainerObj.containerTop = $container.offset().top;

    };

    resizeableImage.resizing = function (e) {
        var mouse = {}, width, height, left, top, offset = $container.offset();
        mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
        mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

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
        if (constrain || e.shiftKey) {
            height = width / orig_src.width * orig_src.height;
        }
        if (width > min_width && height > min_height && width < max_width && height < max_height) {

            resizeableImage.resizeImage(width, height);
            $container.offset({ 'left': left, 'top': top });
        }
    };

    resizeableImage.resizeImage = function (width, height) {;
        resize_canvas.width = width;
        resize_canvas.height = height;
        resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);
        $(resizeableImage.image_target).attr('src', resize_canvas.toDataURL("image/png"));

        var containerId = ($container.attr('id'));
        var currentContainerObj = getCurrentContainer(containerId);
        currentContainerObj.image = resize_canvas.toDataURL("image/png");
    };

    resizeableImage.startMoving = function (e) {
        e.preventDefault();
        e.stopPropagation();
        resizeableImage.saveEventState(e);
        $(document).on('mousemove touchmove', resizeableImage.moving);
        $(document).on('mouseup touchend', resizeableImage.endMoving);
    };

    resizeableImage.endMoving = function (e) {
        e.preventDefault();
        $(document).off('mouseup touchend', resizeableImage.endMoving);
        $(document).off('mousemove touchmove', resizeableImage.moving);

        var containerId = ($container.attr('id'));
        var currentContainerObj = getCurrentContainer(containerId);
        currentContainerObj.containerWidth = $container.width();
        currentContainerObj.containerHeight = $container.height();
        currentContainerObj.containerLeft = $container.offset().left;
        currentContainerObj.containerTop = $container.offset().top;
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
            resizeableImage.resizeImage(width, height);
        }
    };
    return resizeableImage;

}());

module.exports = resizeableImage;