define([
    'jquery',
    'underscore',
    'backbone',
    'parse',
], function ($, _, Backbone, Parse) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: '#app-view',

        initialize: function() {
            this.render();
        },

        render: function() {
            return "test";
        }
    });

    return AppView;
});