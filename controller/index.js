var citybikes = require('citybikes-js'),
    extend    = require('node.extend');

// inherit from base controller
var Controller = extend( {}, BaseController );
module.exports = Controller;

// general helper for not found repos
Controller.notFound = function(req, res){
  res.send('Must specify a network name with /networks/<networkName> or ask for all networks with /networks', 404);
};

// renders an empty map with a text input 
Controller.index = function(req, res){
  res.render(__dirname + '/../views/index');
};

// general helper for error'd requests
function sendError(req, res){
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
        Controller._processFeatureServer(req, res, err, stations, callback);
      } else {
        res.json(stations[0]);
      }
    } else {
      sendError(req, res);
    }
  });
}

Controller.networks = function(req, res) {
  getNetworks(req, res, false);
}

Controller.stations = function(req, res) {
  getStations(req, res, false);
}

Controller.featureservice = function(req, res){
  if (req.params.networkName) {
    getStations(req, res);
  } else {
    getNetworks(req, res);
  }
};
