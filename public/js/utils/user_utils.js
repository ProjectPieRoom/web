define([
  //Libraries
  'jquery',
  'underscore',
  'backbone',
  'parse',
], function($, _, Backbone, Parse){
  function UserUtils() {
    // Assign public functions to class
     this.like = like;
     this.unlike = unlike;

    // Functions
    function like(companyID){
      var user = Parse.User.current();
        
      // Hack in place to test out favoriting companies
      if (!user) {
        
        var userQuery = new Parse.Query(Parse.User);
        userQuery.get("EegPQLi98M", {
          success: function(userObj) {
            user = userObj;
            var Company = Parse.Object.extend("Company"); 
            var companyQuery = new Parse.Query(Company);
            companyQuery.get(companyID, {
              success: function(companyObj) {
                var relation = user.relation("Favorites");
                relation.add(companyObj);
                user.save();
              },
            });
          },
        });
      } 
      else {
        var Company = Parse.Object.extend("Company"); 
        var companyQuery = new Parse.Query(Company);
        companyQuery.get(companyID, {
          success: function(companyObj) {
            var relation = user.relation("Favorites");
            relation.add(companyObj);
            user.save();
          },
        });
      }
    }

    function unlike(companyID){
      var user = Parse.User.current();
        
      // Hack in place to test out favoriting companies
      if (!user) {
        
        var userQuery = new Parse.Query(Parse.User);
        userQuery.get("EegPQLi98M", {
          success: function(userObj) {
            user = userObj;
            var Company = Parse.Object.extend("Company"); 
            var companyQuery = new Parse.Query(Company);
            companyQuery.get(companyID, {
              success: function(companyObj) {
                var relation = user.relation("Favorites");
                relation.remove(companyObj);
                user.save();
              },
            });
          },
        });
      } 
      else {
        var Company = Parse.Object.extend("Company"); 
        var companyQuery = new Parse.Query(Company);
        companyQuery.get(companyID, {
          success: function(companyObj) {
            var relation = user.relation("Favorites");
            relation.remove(companyObj);
            user.save();
          },
        });
      }
     }
  }
  return new UserUtils();
});