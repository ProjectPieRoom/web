define([
  'jquery',
  'underscore',
  'backbone',
  'parse',
  '../app/search_dispatcher',
  'text!templates/components/checkbox_template.html',
], function($, _, Backbone, Parse, SearchEventDispatcher, CheckboxTemplate){
  var checkboxView = Parse.View.extend({
    template: _.template( CheckboxTemplate ),

    clicked: function(e) {
      e.preventDefault();
      checkbox = $(e.currentTarget).find("input");
      checkbox.prop("checked", !checkbox.prop("checked"));
      SearchEventDispatcher.trigger(e.data.msg, e);
    },

    initialize: function(options) {
      this.checkClassName = options.checkClassName;
      this.label = options.label;
      this.text = options.text;
      this.parentElem = $(options.parentElem);
      this.message = options.message;
      return this;
    },

    bindActions: function() {
      this.$el.on("click", { msg: this.message }, this.clicked);
    },

    render: function(){
      var data = {
        checkClassName: this.checkClassName,
        label: this.label,
        text: this.text,
      }
      this.template = this.template(data);
      this.$el.html( this.template );
      this.parentElem.append(this.$el);
      this.bindActions();
      return this;
    }
  });
  return checkboxView;
});