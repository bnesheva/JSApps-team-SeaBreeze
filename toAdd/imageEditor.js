// JavaScript source code

var drawImageEditor =
function drawImageEditor() {
    return function (selector) {
        var template =
        '<div class="container-fluid">' +
  //      '<canvas id="test"></canvas>' +
            '<div class="overlay">' +
                '<div class="overlay-inner"></div>' +
            '</div>' +
            '<video autoplay id="camera"></video>' +
            '<img src="" id="shot">' +
            '<div id="shotButtonWrapper">' +
                '<button id="takeShot">Take Photo</button>' +
            '</div>' +
        '</div>';


        var tableTemplate = Handlebars.compile(template);
        var data = {

        }
        var htmlToDraw = tableTemplate(data);
        $(selector).html(htmlToDraw);
    };
};

//drawImageEditor('main');
module.exports = drawImageEditor;