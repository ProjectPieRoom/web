define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'text!templates/company/company_template.html',

  //Utils
  'utils/user_utils',
], function($, _, Backbone, Parse, CompanyTemplate, UserUtils){
  var CompanyView = Parse.View.extend({
    className: 'company_tile',
    template: _.template( CompanyTemplate ),

    initialize: function(options) {
      this.parentElem = $(options.parentElem);
    },

    render: function(){
      var data = {
        company: this.model.toJSON(),
        //shortenedDescription: this.truncateDescription(this.model.get('Description'), 200)
      };
      this.template = this.template( data );
      this.$el.html( this.template );
      this.parentElem.append(this.$el);
      this.bindActions();
      return this;
    },

    //short str to n chars
    truncateDescription: function(str, n) {
      if (str.length <= n) return str;
      return str.substr(0,n-4)+"...";
    },

    // Bind actions to icons
    bindActions: function() {
      this.$el.find(".heart.unselected").on("click", select_heart);
      this.$el.find(".heart.selected").on("click", unselect_heart);
      var companyID = this.model.id;

      function select_heart(){
        $(this).attr("src", "img/icons/heart_selected.png");
        $(this).removeClass("unselected").addClass("selected");
        $(this).off("click", select_heart);
        $(this).on("click", unselect_heart);
        UserUtils.like(companyID);
      }

      function unselect_heart(){
        $(this).attr("src", "img/icons/heart_unselected.png");
        $(this).removeClass("selected").addClass("unselected");
        $(this).off("click", unselect_heart);
        $(this).on("click", select_heart);
        UserUtils.unlike(companyID);
      }
    },

    favorite: function() {
      var heart = this.$el.find(".heart.unselected");
      heart.attr("src", "img/icons/heart_selected.png");
      heart.removeClass("unselected").addClass("selected");
      heart.off();
      this.bindActions();
    },

  });
  return CompanyView;
});