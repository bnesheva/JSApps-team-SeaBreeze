// JavaScript source code

function drawHTML() {
    return function (selector) {
        var template =
        '<div class="container-fluid sticker_container">' +
            '<h3>Choose sticker to add</h3>' +

            '<div class="sticker_holder">' +
                '{{#each stickers}}' +
                    '<div class="sticker_thumbnail"><img src="images/stikers/' + '{{this.name}}' + '.png"/></div>' +
                '{{/each}}' +
            '</div>' +
            '<div id="test_draw"></div>' +
        '</div>';


        var tableTemplate = Handlebars.compile(template);
        var data = {
            stickers: [
                { name: 'js' },
                { name: 'css' },
                { name: 'html' },
                { name: 'love_jquery' },
                { name: 'jedi_master' },
                { name: 'ceepcalm' },
                { name: 'pixelperfect' },
                { name: 'rockstar' },
                { name: 'chain' },
                { name: 'cigar' },
                { name: 'glasses-01' },
                { name: 'glasses-02' },
                { name: 'hat' },
                { name: 'hat-02' },
                { name: 'mustaches-01' },
                { name: 'mustaches-02' },
                { name: 'thug-01' },
            ]
        }
        var stickersToDraw = tableTemplate(data);
        $(selector).html(stickersToDraw);
    };
};

var func = drawHTML();
func('#sticker_palette');