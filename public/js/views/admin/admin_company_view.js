define([
	'jquery',
	'underscore',
	'backbone',
	'parse',
	'text!templates/admin/admin_company_template.html'
], function($, _, Backbone, Parse, companyTemplate){
	var CompanyView = Parse.View.extend({
		template: _.template( companyTemplate ),

		initialize: function(options) {
			this.el = options.el;
			this.model = options.model;
		},

		render: function(){
			var data = {
				model: this.model
			};
			this.template = this.template( data )
			$(this.el).append( this.template );
			return this
		}
	});
	return CompanyView;
});