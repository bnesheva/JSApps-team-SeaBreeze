var DBOperations = require('../DBOperations.js');

var UserServices = (function () {
    var userServices;
    
    userServices = {
        createUser: function(username, password){
            console.log(DBOperations.GetAllUsers().success());
        }
    }
    
    return userServices;
})();

module.exports = UserServices;