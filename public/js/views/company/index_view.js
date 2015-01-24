define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  '../../collections/company/companies_collection',
  '../app/search_dispatcher',
  'text!templates/company/index_template.html',
  'views/company/company_view',
  'views/company/search_sidebar'
], function($, _, Backbone, Parse, CompaniesCollection, SearchEventDispatcher, IndexTemplate, CompanyView, SearchSidebar){
  var CompanyIndexView = Parse.View.extend({
    el: $('#app-view'),

    initialize: function(options) {
      this.collection = options.companies;
      this.initializeCollection();
      this.dupCollection();
      SearchEventDispatcher.on("location_filter_click", this.filterCompanies, this);
      SearchEventDispatcher.on("employees_filter_click", this.filterCompanies, this);
    },

    initializeCollection: function() {
      if(this.originalCollection) {
        this.collection = this.originalCollection
      }
      this.collection.bind('sort', this.render, this);
    },

    dupCollection: function() {
      var that = this;
      var allModels = this.collection.filter(function(model) {
        return true;
      });
      this.originalCollection = new CompaniesCollection(allModels);
    },

    clearAll: function() {
      $("#content_box").html("");
    },

    addAll: function() {
      this.clearAll();
      this.collection.forEach( this.addOne, this );
    },

    addOne: function(company) {
      var view = new CompanyView({
        model: company
      });
      this.$('#content_box').append( view.render().$el );
    },

    addSome: function(companies) {
      this.clearAll();
      _.each(companies, function(company) {
        this.addOne(company)
      }, this)
    },

    filterCompanies: function() {
      //Aggregate all filters
      this.initializeCollection();
      this.filterByLocation();
      this.filterByEmployeeCount();
      //More filters
      this.addAll();
    },

    filterByLocation: function() {
      var locationCheckboxes = $(".location_checkbox");
      var checkedLocationCheckboxes = [];
      locationCheckboxes.each(function() {
        var checkbox = $(this);
        if(checkbox.is(":checked")) {
          checkedLocationCheckboxes.push(checkbox);
        }
      });
      if(checkedLocationCheckboxes.length == 0) return; //Keep all
      var includeLocations = _.map(checkedLocationCheckboxes, function(checkbox) {
        return checkbox.data("text");
      });
      this.collection = this.collection.includeLocations(includeLocations);
    },

    filterByEmployeeCount: function() {
      var employeeCountCheckboxes = $(".employee_count_checkbox");
      var checkedEmployeeCountCheckboxes = [];
      employeeCountCheckboxes.each(function() {
        var checkbox = $(this);
        if(checkbox.is(":checked")) {
          checkedEmployeeCountCheckboxes.push(checkbox);
        }
      });
      if(checkedEmployeeCountCheckboxes.length == 0) return; //Keep all
      var includeEmployeeCounts = _.map(checkedEmployeeCountCheckboxes, function(checkbox) {
        return checkbox.data("text");
      });
      this.collection = this.collection.includeEmployeeCount(includeEmployeeCounts);
    },

    render: function() {
      var template = _.template( IndexTemplate );
      this.$el.html( template );
      new SearchSidebar({collection: this.collection}).render();
      this.addAll();
      return this;
    }
  });
  return CompanyIndexView;
});