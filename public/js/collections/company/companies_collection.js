define([
	'parse',
	'models/company/company'
], function(Parse, CompanyModel) {
	var CompaniesCollection = Parse.Collection.extend({
	  model: CompanyModel
	});
	return CompaniesCollection;
});

