##Naming conventions:
*   photo (снимка) - the initial image we will edit
*   sticker (стикер) - any image to add to the photo
*   image (изображение) - any image data of the above
*   picture (картинка) - the final collaged image


#Basic functionality:

##1. Load photo
	*   a) from local file - most desirable
	*   b) from URL - as bossibility
	*   c) controls device camera - plan maximum

##2. Add sticker
choosing from preset images whose previews are available on the screen

##3. Resize image

##4. Position image 

the two above shall work both for photo and stickers - this will cover the cropping functionality

##5.Share picture

	*   a) upload the picture somewhere to host it - facebook, instagram, saves the URL(associates it with the user - see p.6)
	*   b) save image locally - opional

##6. Login user
user profile functionality - username, password, picture

#Additional functionality

##7. Gallery
list of all pictures of all users with rating and rate button added

##8. Rating
the user can vote for pictures

##9. Top rated pictures - a list of 5 or 10 top rated pictures

##10. Multiple pictures per user
to store multiple pictures in one's user profile


##Wireframe:

![Wireframe](/images/wireframe_v1.jpg)

==========================================================

#Requirements:

##General Requirements
Please define and implement the following assets in your project:
*   Use [jQuery](https://jquery.com/) - **Done**
*   Implement OOP design
    *   Application logic using objects, modules and data hiding
        *   Both Prototypal and classical inheritances are Ok
    *   At least 3 modules
    *   At least 7 types of objects - *resizeableImage is one kind of object with two kinds of children .. also maybe the ImageAddings*
*   Unit tests
    *   Using [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/) and [SinonJS](http://sinonjs.org/)
*   Implement a UI for your application 
    *   Use KendoUI, jQueryUI or implement your own UI logic - - **Done - own UI Logic, bootstrap-based**
*   Use some kind of web data storage, one of the following is Ok
    *   Your backend with Node.js, PHP, ASP.NET, Django, Ruby on Rails, Spring, etc...
    *   Telerik Backend Services
    *   Parse
    *   Microsoft Mobile App Services
*   Use some kind of local storage, one of the following is Ok:
    *   `localStorage` - - **Done - we keep base64 image data on every resize**
    *   `sessionStorage`
*   Use [Twitter Bootstrap](http://getbootstrap.com/) - **Done**
    *   Research and use Bootstrap for your application - **Done**
    *   Make the application responsive for different screens and resolutions - **Done**
*   At least one third-party API to share something from your application
    *   Samples:
        *   Share status to Facebook, Google+, Twitter, etc...
        *   Upload images to Facebook, Flickr, Instagram             
*   **The application must work in the latest versions of the browsers: Google Chrome, Mozilla Firefox, Internet Explorer 10/11, Opera and Apple Safari**

##Additional Requirements
Follow the best practices for producing high-quality code: 
*   **Correct naming**
*   **Data encapsulation**
    *   Use OOP and modules
*   **Strong cohesion** and **loose coupling**
*   Use **GIT** as a source control system
*   Host it on [http://github.com](http://github.com)

##Optional Requirements    
If you have a chance, time and a suitable situation, you might add some of the following to your project:
*   Backward compatibility (make the application usable on browsers like IE8, IE7 and IE6)
*   Integration tests
*   Usage of a structural JavaScript framework:
    *   AngularJS, KendoUI, Knockout.js, Backbone.js, etc...

##Non-required Work
*   Completely finished project is not obligatory required. It will not be a big problem if your project is not completely finished or is not working greatly
    *   This team work project is for educational purpose
    *   Its main purpose it to experience using graphics, DOM manipulation and OOP in a real-world-like project and to get some experience in team working and team collaboration with a source control system.
*   Implementation of server-side logic with ASP.NET, PHP, Java or Node.js

##Deliverables

*   Register your application at [Telerik Academy Showcase System](http://best.telerikacademy.com)
    *   Provide a link for the github repository of your application
    *   Host your application on a server, and provide a link
        *   You can host your application on http://appharbor.com, http://heroku.com or just use the http://rawgit.com








