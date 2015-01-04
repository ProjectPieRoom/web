  // Filename: main.js

// Require.js allows us to configure shortcut alias
// There usage will become more apparent further along in the tutorial.
require.config({
  shim: {
    underscore: {
      exports: '_'
    },
    backbone: {
      deps: [
        'underscore',
        'jquery'
      ],
      exports: 'Backbone'
    },
    bootstrap: {
      deps: [
        'jquery'
      ]
    },
    parse: {
      deps: ['jquery', 'underscore'],
      exports: 'Parse'
    },
    parallax: ['jquery'],
    facebook: {
      exports: 'FB'
    }
  },
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    bootstrap: 'lib/bootstrap',
    parse: 'lib/parse',
    parallax: 'lib/parallax',
    facebook: '//connect.facebook.net/en_US/all',
    domReady: 'lib/domReady',
    d3: 'lib/d3.min',
    css: 'lib/require-css/css',
    blurjs: 'lib/blurjs.min',
  }
});

require(['parse', 'facebook', 'app'], function(Parse, FB, App) {
  Parse.initialize('MVUNPXx6ekOT3oyMfyB5zivoaEIbSAc0POXRCUp7',
                    'AQZSZiM4N3a7bnaXqq3J5LL6KiRUtO6Ygofdnj9V');

  //Facebook SDK
  Parse.FacebookUtils.init({ // this line replaces FB.init({
    appId      : 317269141805462, // Facebook App ID
    status     : true,  // check Facebook Login status
    cookie     : true,  // enable cookies to allow Parse to access the session
    xfbml      : true,  // initialize Facebook social plugins on the page
    version    : 'v2.2' // point to the latest Facebook Graph API version
  });

  FB.getLoginStatus(function(response) {
    //console.log(response);
  });

  App.initialize();
});

require(['bootstrap'], function() {
  //necessary from dropdown in navbar
});
