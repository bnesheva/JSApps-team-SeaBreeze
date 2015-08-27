/**
 * Created by Nick on 26/8/2015.
 */

var Image = (function () {

    var Image = {};

    Image.init = function(id, userName, name, url, rating) {
        this.id = id || '';
        this.userName = userName || '';
        this.name = name || '';
        this.url = url || '';
        this.rating = rating || 0;
        this.content = null;
        return this;
    };

    //img = {
    //    "Filename": 'name',
    //    "ContentType": "image",
    //    "base64": imgData
    //};

    return Image;
})();

module.exports = Image;