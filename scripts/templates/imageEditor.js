// JavaScript source code

function drawImageEditor() {
    return function (selector) {
        var template =
            '<div class="container-fluid">' +
                '<div class="overlay">' +
                    '<div class="overlay-inner"></div>' +
                '</div>' +
                '<video autoplay id="camera"></video>' +
                '<img src="" id="shot">' +
                '<div id="shotButtonWrapper">' +
                    '<button id="takeShot">Take Photo</button>' +
                '</div>' +
            '</div>';
		var data = '';
        var tableTemplate = Handlebars.compile(template);
        var htmlToDraw = tableTemplate(data);
        $(selector).html(htmlToDraw);
    };
}

var func = drawImageEditor();
func('main');