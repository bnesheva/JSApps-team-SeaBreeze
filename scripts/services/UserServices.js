var DBOperations = require('../DBOperations.js');
var _ = require('../libraries/underscore-min.js');

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
                    console.log(userIsTaken);
                    if (!userIsTaken) {
                        DBOperations.AddUser();
                    }
                });
        },
        
       login: function(username, password){
            var userIsValid;

            DBOperations.GetAllUsers()
                .success()
                .then(function (data) {
                    var users = data.Result;
                    userIsValid = _.some(users, function (item) {
                        return item.Username === username;
                    });
                                    
                    if (userIsValid) {
                        
                    }
                });
       }   
    }

    return userServices;
})();

module.exports = UserServices;