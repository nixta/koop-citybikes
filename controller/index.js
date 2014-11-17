var citybikes = require('citybikes-js'),
  extend = require('node.extend'),
  BaseController = require('koop-server/lib/BaseController.js');

// inherit from base controller
var Controller = function(Citybikes) {

  var controller = {};
  controller.__proto__ = BaseController();

  // general helper for not found repos
  controller.notFound = function(req, res) {
    res.send('Must specify a network name with /networks/<networkName> or ask for all networks with /networks', 404);
  };

  // renders an empty map with a text input
  controller.index = function(req, res) {
    res.render(__dirname + '/../views/index');
  };

  // general helper for error'd requests
  function sendError(req, res) {
    res.send('There was a problem accessing Citybik.es', 500);
  };

  function getNetworks(req, res, forFeatureServer) {
    var callback = req.query.callback;
    delete req.query.callback;
    Citybikes.findNetworks(req.query, function(err, networks) {
      if (!err) {
        if (forFeatureServer !== false) {
          delete req.query.geometry;
          Controller._processFeatureServer(req, res, err, networks, callback);
        } else {
          res.json(networks[0]);
        }
      } else {
        sendError(req, res);
      }
    });
  }

  function getStations(req, res, forFeatureServer) {
    var callback = req.query.callback;
    delete req.query.callback;

    Citybikes.findStations(req.params.networkName, req.query, function(err, stations) {
      if (!err) {
        if (forFeatureServer !== false) {
          controller.processFeatureServer(req, res, err, stations, callback);
        } else {
          res.json(stations[0]);
        }
      } else {
        sendError(req, res);
      }
    });
  }

  controller.networks = function(req, res) {

    getNetworks(req, res, false);
  }

  controller.stations = function(req, res) {
    getStations(req, res, false);
  }

  controller.featureservice = function(req, res) {
    if (req.params.networkName) {
      getStations(req, res);
    } else {
      getNetworks(req, res);
    }
  };
  return controller;
}

module.exports = Controller;