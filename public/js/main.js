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
    parse: {
      deps: ['jquery', 'underscore'],
      exports: 'Parse'
    },
    parallax: ['jquery'],
  },
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    parse: 'lib/parse',
    parallax: 'lib/parallax',
    domReady: 'lib/domReady',
    d3: 'lib/d3.min',
    css: 'lib/require-css/css',
    blurjs: 'lib/blurjs.min',
  }
});

require(['parse'], function(Parse) {
    Parse.initialize('MVUNPXx6ekOT3oyMfyB5zivoaEIbSAc0POXRCUp7',
                    'AQZSZiM4N3a7bnaXqq3J5LL6KiRUtO6Ygofdnj9V');
});

require([
  'app'
], function(App) {
  App.initialize();
});