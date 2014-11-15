define([
	'jquery',
	'underscore',
	'backbone',
	'parse',
	'layoutmanager',
	'text!templates/components/navbar_template.html'
], function($, _, Backbone, Parse, Layout, navbarTemplate){

	var NavBarView = Backbone.View.extend({
		manage: true,
		el: $('#navbar'),
		initialize: function() {},

		render: function(){
			var data = {};
			var compiledTemplate = _.template( navbarTemplate, data );
			// $('#navbar').html (compiledTemplate);
			$(this.el).html( compiledTemplate );
		}
	});
	// Our module now returns our view
	return NavBarView;
});