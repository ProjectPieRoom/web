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
     this.getFavorites = getFavorites;

    // Functions
    function like(companyID){
      var user = Parse.User.current();
      if (user){
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

    function unlike(companyID) {
      var user = Parse.User.current();   
      if (user) {
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

    function getFavorites(parent_view) {
      var user = Parse.User.current();
      if (user) {
        var relation = user.relation("Favorites");
        relation.query().find({
          success: function (list) {
            parent_view.displayFavorites(list);
          },
        });
      }
    }
  }
  return new UserUtils();
});