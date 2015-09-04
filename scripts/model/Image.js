/**
 * Created by Nick on 26/8/2015.
 */

var Image = (function () {
    var _ = require("bower_components/underscore.js");

    var image = Object.create({});

    Object.defineProperty(image, 'init', {
        value: function (id, username, userId, url, rating) {
            this.id = id;
            this.username = username;
            this.name = name;
            this.url = url;
            this.rating = rating || 0;
            this.content = null;
            return this;
        }
    });

    Object.defineProperty(image, 'username', {
        get: function () {
            return this._username;
        },
        set: function (value) {
            this._username = value;
        }
    });

    Object.defineProperty(image, 'userId', {
        get: function () {
            return this._userId;
        },
        set: function (value) {
            this._userId = value;
        }
    });

    Object.defineProperty(image, 'url', {
        get: function () {
            return this._url;
        },
        set: function (value) {
            this._url = value;
        }
    });

    Object.defineProperty(image, 'rating', {
        get: function () {
            return this._rating;
        },
        set: function (value) {
            this._rating = value;
        }
    });

    //img = {
    //    "Filename": 'name',
    //    "ContentType": "image",
    //    "base64": imgData
    //};

    return image;
})();
module.exports = Image;