// JavaScript source code


var drawImageEditor = require('./templates/imageEditor.js')

//var pagination = 

(function ($) {
    console.log('running sammy')
    var app = $.sammy(function () {

        this.get('#/', function () {
            //$('#main').text('');
            drawImageEditor('main');
        });

        this.get('#/test', function () {
            $('main').html('Hello World');
        });

    });

    $(function () {
        app.run()
    });
})(jQuery);


//module.exports = pagination;

