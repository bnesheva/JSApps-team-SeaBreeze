var _ = require('../libraries/underscore-min.js');
var DBOperations = require('../DBOperations.js');
var User = require('../model/User.js');

var UserServices = (function () {
    var userServices;

    userServices = {
        createUser: function (username, password) {
            DBOperations.GetAllUsers()
                .success()
                .then(function (data) {
                    var users = data.Result;
                    var userIsTaken = _.some(users, function (item) {
                        return item.Username === username;
                    });

                    if (!userIsTaken) {
                        DBOperations.AddUser({
                            Username: username,
                            Password: password,
                            PicsArray: []
                        });
                    }
                });
        },

        loginUser: function(username, password) {
            var user = {
                "username": username,
                "password": password,
                "grant_type": "password"
            };

            DBOperations.LogInUser(user)
                .fail(function (data) {
                    console.log('ERROR Loggin in: ', data)
                })
                .success(function(data) {
                    console.log(data.Result);
                    localStorage.setItem('currUserToken', data.Result.access_token);
                    localStorage.setItem('currUserID', data.Result.principal_id);

                    console.log('Logged In Successfully. Your Token: ', localStorage.getItem('currUserToken'))
                });
        },

        logOutUser: function() {
            DBOperations.LogOutUser(localStorage.getItem('currUserToken'))
                .success(function(data) {
                    console.log('Successfully logged out ', data)
                })
                .fail(function(data) {
                    console.log('Failed loggin out ', data);
                })
        },

        welcomeCurrentUser: function(id) {
            DBOperations.GetUserById(id)
                .success(function(data) {
                    var username = data.Result.Username;
                    localStorage.setItem('currUserName', username);
                    $('#show_profile').text('Hey, ' + localStorage.getItem('currUserName'));
                })
        }

    };
    return userServices;
})();
module.exports = UserServices;