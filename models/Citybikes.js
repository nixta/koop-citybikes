var citybikes = require('citybikes-js'),
    _ = require('lodash');

exports.findNetworks = function(options, callback){
  var key  = 'Networks',
      type = 'Citybikes';
  
  Cache.get(type, key, options, function(cacheErr, entry){
    if (cacheErr){
      citybikes.networks(function(err, networks) {
        if (err) {
          callback(err, null);
        } else {
          var output = [{features:_.map(networks, function(n) {
            n.properties.stationsURL = "/citybikes/network/" + n.id + "/FeatureServer/0"
            return n;
          })}];
          Cache.insert(type, key, output, 0, function(insertErr, success) {
            if (success) {
              callback(null, output);
            } else {
              callback(insertErr, null);
            }
          });
        }
      });
    } else {
      callback( null, entry );
    }
  });
};

exports.findStations = function(networkName, options, callback){
  var key  = 'Stations_' + networkName,
      type = 'Citybikes';
  
  Cache.get(type, key, options, function(cacheErr, entry){
    if (cacheErr){
      citybikes.stations(networkName, function(err, stations) {
        if (err) {
          callback(err, null);
        } else {
          var output = [{features:stations}];
          Cache.insert(type, key, output, 0, function(insertErr, success) {
            if (success) {
              callback(null, output);
            } else {
              callback(insertErr, null);
            }
          });
        }
      });
    } else {
      callback( null, entry );
    }
  });
};
