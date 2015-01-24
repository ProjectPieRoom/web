define([
	'parse',
	'models/company/company'
], function(Parse, CompanyModel) {
	var CompaniesCollection = Parse.Collection.extend({
	  model: CompanyModel,
	  comparator: function(a, b) {
	  	a = a.get("Quality");
	  	b = b.get("Quality");
	  	return a > b ? -1
	  			:  a < b ?  1
	  			:           0;
	  },
	  includeLocations: function(locationsToInclude) {
	  	filtered = this.filter(function(company) {
	  		locations = company.get("Locations")
	  		var include = false;
	  		_.each(locations, function(location) {
	  			_.each(locationsToInclude, function(locationToInclude) {
	  				if(location == locationToInclude) include =  true;
	  			});
	  		})
	  		return include;
	  	});
	  	return new CompaniesCollection(filtered);
	  }
	});
	return CompaniesCollection;
});

