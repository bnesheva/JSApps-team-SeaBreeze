// JavaScript source code

function drawWelcomeScreen() {
    return function (selector) {
        var template =
            '<div class="welcome_holder">' +
                '<div class="row">' +
                    '<div class="col-sm-6 banner"></div>' +
                    '<div class="col-sm-6 action">' +
                        '<h1>Become a skilled developer overnight!</h1>' +

                        '<p class="step"><span>1</span> Upload your photo</p>' +

                        '<p class="step"><span>2</span> Add stickers for your specialties</p>' +

                        '<p class="step"><span>3</span> Share your proggress</p>' +

                        '<div id="sliding_container">' +
                            '<div class="row slideable">' +
                                '<div class="col-xs-6 login_box">' +
                                    '<h2>Boost your skills NOW</h2>' +

                                    '<p>Not a member yet? <span id="switch_to_register">So sign up!</span></p>' +

                                    '<div id="login_form">' +
                                        'Username:<br>' +
                                        '<input id="logInUsernameInput" type="text" name="username">' +
                                        '<br>' +
                                        'Password:<br>' +
                                        '<input id="logInPasswordInput" type="password" name="password">' +
                                        '<br>' +
                                        '<button id="logInButt">Login</button>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="col-xs-6 register_box">' +
                                    '<h2>Create NEW account</h2>' +

                                    '<p>Already a member? <span id="switch_to_login">So log in!</span></p>' +

                                    '<div id="register_form">' +
                                        'Username:<br>' +
                                        '<input id="registerUsernameInput" type="text" name="username">' +
                                        '<br>' +
                                        'Password:<br>' +
                                        '<input id="registerPasswordInput" type="password" name="password">' +
                                        '<br>' +
                                        '<button id="registerButt">Register</button>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>';
		var data = '';
        var tableTemplate = Handlebars.compile(template);
        var htmlToDraw = tableTemplate(data);
        $(selector).html(htmlToDraw);
    };
}

var func = drawWelcomeScreen();
func('#welcome_screen');

$('#switch_to_register').on('click', function () {
    $('.slideable').addClass('slided');
	
});

$('#switch_to_login').on('click', function () {
    $('.slideable').removeClass('slided');
	
});