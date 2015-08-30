var _ = require('../libraries/underscore-min.js');
var DBOperations = require('../DBOperations.js');
var User = require('../model/User.js');

var UserServices = (function () {
    var userServices;

    userServices = {
        createUser: function (username, password) {
            var userIsTaken;

            DBOperations.GetAllUsers()
                .success()
                .then(function (data) {
                    var users = data.Result;
                    userIsTaken = _.some(users, function (item) {
                        return item.Username === username;
                    });

                    if (!userIsTaken) {
                        DBOperations.AddUser();
                    }
                });
        },

        login: function (username, password) {
            DBOperations.GetAllUsers()
                .success()
                .then(function (data) {
                    var users = data.Result;
                    var user = _.find(users, function (item) {
                        return item.Username === username && item.password === password;
                    });
 
                    if (user) {              
                        var currentUser = User.init(user.id, user.username, user.password, user.picsArray);         
                        localStorage.setItem('currentUser', JSON.stringify(currentUser));      
                    }
                });
        }
    }

    return userServices;
})();

module.exports = UserServices;