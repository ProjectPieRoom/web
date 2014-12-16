define([
	'jquery',
	'underscore',
	'backbone',
	'parse',
	'text!templates/components/navbar_template.html'
], function($, _, Backbone, Parse, navbarTemplate){
	var NavBarView = Parse.View.extend({
		template: _.template( navbarTemplate ),

		initialize: function(options) {
			this.el = options.el
		},

		render: function(){
			var data = {
				// Add data later
			};
			this.template = this.template( data )
			$(this.el).html( this.template );
			return this
		}
	});
	// Our module now returns our view
	return NavBarView;
});