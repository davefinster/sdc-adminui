define(function(require) {
  // UsersView

  var CreateUserView = require('views/users-create');
  var BaseView = require('views/base');
  var tplUsers = require('text!tpl/users.html');

  return BaseView.extend({

    template: tplUsers,

    name: 'users',

    events: {
      'click button[data-event=new-user]': 'newUser',
      'submit .form-search': 'onSearch'
    },

    initialize: function() {
      _.bindAll(this, 'newUser');
    },

    newUser: function() {
      this.createView = new CreateUserView();
      this.createView.render();
    },

    onSearch: function(e) {
      return false;
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    }
  });
});
