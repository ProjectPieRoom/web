define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  'd3',
  '../app/search_dispatcher',
  'text!templates/company/search_sidebar_template.html',
  '../components/checkbox_view'
], function($, _, Backbone, Parse, d3, SearchEventDispatcher, SearchSidebarTemplate, CheckboxView){
  var CompanySearchSidebarView = Parse.View.extend({
    el: "#search_sidebar",
    template: _.template( SearchSidebarTemplate ),
    events: {
      "click .sort_section": "reorder",
      "click .filter_section": "expandFilterOption"
    },

    initialize: function(options) {
      this.collection = options.collection;
      //SearchEventDispatcher.on("location_filter_click", this.filterByLocation, this);
      return this;
    },

    reorder: function(e) {
      e.preventDefault();
      var sortType = $(e.currentTarget).data("sort-type")
      switch(sortType) {
        case "Popularity":
          this.collection.comparator = function(a, b) {
            a = a.get("Quality");
            b = b.get("Quality");
            return a > b ? -1
                :  a < b ?  1
                :           0;
          }
          break;
        case "Name":
          this.collection.comparator = function(a, b) {
            a = a.get("CompanyName");
            b = b.get("CompanyName");
            return a > b ?  1
                :  a < b ? -1
                :           0;
          }
          break;
        default:
          break;
      }
      this.collection.sort();
    },

    expandFilterOption: function(e) {
      e.preventDefault();
      $($(e.currentTarget).data("target")).collapse({
        toggle: true
      });
      $(e.currentTarget).children(".chevron").toggleClass("fa-chevron-circle-left");
      $(e.currentTarget).children(".chevron").toggleClass("fa-chevron-circle-down")
    },

    appendLocationFilters: function() {
      var seenLocations = {};
      this.collection.each(function(model, index) {
        var locations = model.get("Locations");
        for(var i = 0; i < locations.length; i++) {
          if( !seenLocations[locations[i]] ) {
            new CheckboxView({
              checkClassName: "location_checkbox",
              label: locations[i],
              text: locations[i],
              parentElem: "#location_filter_container .well",
              message: "location_filter_click"
            }).render();
            seenLocations[locations[i]] = true;
          }
        }
      });
    },

    appendEmployeeCountFilters: function() {
      new CheckboxView({
        checkClassName: "employee_count_checkbox",
        label: "1-10 employees",
        text: "1",
        parentElem: "#employees_filter_container .well",
        message: "employees_filter_click"
      }).render();
      new CheckboxView({
        checkClassName: "employee_count_checkbox",
        label: "11-50 employees",
        text: "11",
        parentElem: "#employees_filter_container .well",
        message: "employees_filter_click"
      }).render();
      new CheckboxView({
        checkClassName: "employee_count_checkbox",
        label: ">50 employees",
        text: "50",
        parentElem: "#employees_filter_container .well",
        message: "employees_filter_click"
      }).render();
    },

    render: function() {
      this.$el.html( this.template );
      this.appendLocationFilters();
      this.appendEmployeeCountFilters();
      return this;
    }
  });
  return CompanySearchSidebarView;
});