var user = (function () {
    var currentID = 0,
		user = Object.create({});

    Object.defineProperty(user, 'init', {
		value: function (username, password, userImages) {
			this.username = username;
			this.password = password;
			currentID += 1;
			this._id = currentID;
			this._userImages = userImages || [];
			return this;
		}
	});

	Object.defineProperty(user, 'id', {
		get: function () {
			return this._id;
		}
	});

	Object.defineProperty(user, 'username', {
		get: function () {
			return this._username;
		}, 
		set: function (value) {
			this._username = value;
		}
	});

	Object.defineProperty(user, 'username', {
		get: function () {
			return this._username;
		},
		set: function (value) {
			this._username = value;
		}
	});

	Object.defineProperty(user, 'password', {
		get: function () {
			return this._password;
		},
		set: function (value) {
			this._password = value;
		}
	});

	Object.defineProperty(user, 'userImages', {
		get: function () {
			return this._userImages.splice();
		},
		set: function (value) {
			this._userImages = value.splice();
		}
	});

	Object.defineProperty(user, 'addImage', {
		value: function (image) {
			this._userImages.push(image);
			return this;
		}
	});

    return user;
})();

module.exports = user;