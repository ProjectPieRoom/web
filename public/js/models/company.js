window.FindX.Models.Company = Parse.Object.extend("Company", {
  // Default attributes for the todo.
  defaults: {
    content: "empty todo...",
    done: false
  },

  initialize: function() {
    if (!this.get("content")) {
      this.set({"content": this.defaults.content});
    }
  },
  save: function() {

  },
  custom: function() {
    console.log();
  }
});