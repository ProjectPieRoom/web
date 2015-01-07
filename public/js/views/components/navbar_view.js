define([
	'jquery',
	'underscore',
	'backbone',
	'parse',
	'text!templates/components/navbar_template.html'
], function($, _, Backbone, Parse, navbarTemplate){
	var NavBarView = Parse.View.extend({
		el: $('#navbarDiv'),

		events: {
			'click #logout_link': 'logout'
		},

		initialize: function(options) {
		},

		logout: function() {
			Parse.User.logOut();
			console.log("User logged out");
		},

		render: function(){
			var currentUser = Parse.User.current();
			if (currentUser) currentUser = currentUser.toJSON();
			var data = {
				user: currentUser
			};
			var compiled_template = _.template( navbarTemplate );
			compiled_template = compiled_template(data);
			this.$el.html( compiled_template );
			return this
		}
	});
	// Our module now returns our view
	return NavBarView;
});