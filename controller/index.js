var citybikes = require('citybikes-js'),
    extend = require('node.extend');

// inherit from base controller
var Controller = extend( {}, BaseController );

module.exports = Controller;

// general helper for not found repos
Controller.notFound = function(req, res){
  res.send('Must specify a network name with /networks/<networkName> or ask for all networks with /networks', 404);
};

// general helper for error'd requests
Controller.Error = function(req, res){
  res.send('There was a problem accessing Citybik.es', 500);
};

// renders an empty map with a text input 
Controller.index = function(req, res){
  res.render(__dirname + '/../views/index');
};

Controller.networks = function(req, res) {
  var callback = req.query.callback, 
      self = this;
  delete req.query.callback;

  Citybikes.findNetworks(req.query, function(err, networks) {
    if (!err) {
      res.json(networks);
    } else {
      self.Error(req, res);
    }
  });
}

Controller.stations = function(req, res) {
  var callback = req.query.callback, 
      self = this;
  delete req.query.callback;

  Citybikes.findStations(req.params.networkName, req.query, function(err, stations) {
    if (!err) {
      res.json(stations);
    } else {
      self.Error(req, res);
    }
  });
}

Controller.featureservice = function(req, res){
    var callback = req.query.callback, 
        self = this;
    delete req.query.callback;

    if (req.params.networkName) {
      // Asking for a specific network
      Citybikes.findStations(req.params.networkName, req.query, function(err, stations) {
        if (!err) {
          delete req.query.geometry;
          Controller._processFeatureServer(req, res, err, stations, callback);
        } else {
          self.Error(req, res);
        }
      });
    } else {
      // Asking for list of networks
      Citybikes.findNetworks(req.query, function(err, networks) {
        if (!err) {
          delete req.query.geometry;
          Controller._processFeatureServer(req, res, err, networks, callback);
        } else {
          self.Error(req, res);
        }
      });
    }
};
