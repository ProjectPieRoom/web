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
    }
  },
  paths: {
    jquery: 'lib/jquery',
    underscore: 'lib/underscore',
    backbone: 'lib/backbone',
    parse: 'http://www.parsecdn.com/js/parse-1.3.1.min'
  }
});

require(['parse'], function(Parse) {
    Parse.initialize('MVUNPXx6ekOT3oyMfyB5zivoaEIbSAc0POXRCUp7',
                    'AQZSZiM4N3a7bnaXqq3J5LL6KiRUtO6Ygofdnj9V');
});

require([
  'app'
], function(App){
  App.initialize();
});