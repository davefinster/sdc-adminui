var BaseView = require('views/base');
var Server = require('models/server');

var ServerView = BaseView.extend({
  sidebar: 'servers',

  template: 'server',

  initialize: function(options) {
    _.bindAll(this);

    this.server = options.server || new Server();

    if (options.uuid) {
      this.server.set({uuid: options.uuid});
      this.server.fetch();
    }

    this.server.on('change', this.render);
    this.setElement(this.compileTemplate());
  },

  uri: function() {
    return _.str.sprintf('servers/%s', this.server.get('uuid'));
  },

  compileTemplate: function() {
    return this.template({
      server: this.server
    });
  },
  render: function() {
    this.$el.html(this.compileTemplate());
    return this;
  }
});
module.exports = ServerView;