var assert = require('assert');
var fs = require('fs');
var path = require('path');

var express = require('express');
var hbs = require('hbs');
var sdc = require('./sdc');


function loadConfig(file) {
  var _f = fs.readFileSync(file, 'utf8');
  return JSON.parse(_f);
}

module.exports = {

  createServer: function (options) {
    assert.ok(options.config, 'options.config file required');

    var config = loadConfig(options.config);
    var server = express.createServer();

    server.root = path.join(__dirname, '..');




    //
    // === Configure view options
    //
    server.register('.html', hbs);
    server.set('views', path.join(server.root, 'views'));
    server.set('view engine', 'html');
    server.set('view options', { layout: false });

    server.configure(function () {
      server.use(express.bodyParser());
      server.use(express.logger('dev'));
      server.use(sdc(config));
    });

    server.configure('development', function () {
      server.use(
        express.static(path.join(server.root, 'public')),
        express.errorHandler({ dumpExceptions: true, showStack: true }));
    });





    server.post('/auth', function (req, res) {
      assert.ok(req.body.username);
      assert.ok(req.body.password);

      var user = req.body.username;
      var pass = req.body.password;

      req.sdc.ufds.authenticate(user, pass, function (err, u) {
        return res.send(err || u);
      });
    });



    //
    // ==== Routes
    //


    /* JSSTYLED */
    server.get(/^\/(?!img|css|js|favicon\.ico).*$/, function (req, res) {
      res.render('index');
    });


    server.start = function (cb) {
      server.listen(config.port, config.host, cb);
    };

    return server;
  }
};