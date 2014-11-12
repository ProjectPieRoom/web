
$(function() {

  Parse.$ = jQuery;

  Parse.initialize("MVUNPXx6ekOT3oyMfyB5zivoaEIbSAc0POXRCUp7",
                   "AQZSZiM4N3a7bnaXqq3J5LL6KiRUtO6Ygofdnj9V");

  // The Application
  // ---------------
  var test = new FindX.Models.Company();
  console.log(test);
  var test2 = new FindX.Views.Company();
  console.log(test2);

  // The main view for the app
  var AppView = Parse.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    initialize: function() {
      this.render();
    },

    render: function() {
      if (Parse.User.current()) {
        new ManageTodosView();
      } else {
        new LogInView();
      }
    }
  });

  var AppRouter = Parse.Router.extend({
    routes: {
      "all": "all",
      "active": "active",
      "completed": "completed"
    },

    initialize: function(options) {
    },

    all: function() {
      state.set({ filter: "all" });
    },

    active: function() {
      state.set({ filter: "active" });
    },

    completed: function() {
      state.set({ filter: "completed" });
    }
  });

  var state = new AppState;

  new AppRouter;
  new AppView;
  Parse.history.start();
});