// JavaScript source code

function drawToolbar() {
    return function (selector) {
        var template =
        '<button id="load_photo" class="btn btn-default" title="Load">Load</button>' +
        '<button id="take_snapshot" class="btn btn-default" title="Take photo">Photo</button>' +
        '<button id="reset" class="btn btn-default" title="Reset">Reset</button>' +
       // '<button id="crop_image" class="btn btn-default" title="Crop">Crop</button>' +
        '<button id="save_image_button" class="btn btn-default" title="Save">Save</button>' +
       // '<a href="https://www.facebook.com/sharer/sharer.php?u=example.org" target="_blank">' +
        '<button id="share_picture" title="Share" class="btn btn-default">Share</button>';// +
       // '</a>';
		var data = '';
        var tableTemplate = Handlebars.compile(template);
        var htmlToDraw = tableTemplate(data);
        $(selector).html(htmlToDraw);
    };
}

var func = drawToolbar();
func('#toolbar');