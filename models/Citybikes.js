var citybikesJs = require('citybikes-js'),
  BaseModel = require('koop-server/lib/BaseModel.js');
_ = require('lodash');

var Citybikes = function(koop) {

  var citybikes = {};
  citybikes.__proto__ = BaseModel(koop);

  citybikes.findNetworks = function(options, callback) {
    var key = 'Networks',
      type = 'Citybikes';

    koop.Cache.get(type, key, options, function(cacheErr, entry) {
      if (cacheErr) {
        citybikesJs.networks(function(err, networks) {
          if (err) {
            callback(err, null);
          } else {
            var output = [{
              features: _.map(networks, function(n) {
                n.properties.stationsURL = "/citybikes/network/" + n.id + "/FeatureServer/0"
                return n;
              })
            }];
            koop.Cache.insert(type, key, output, 0, function(insertErr, success) {
              if (success) {
                callback(null, output);
              } else {
                callback(insertErr, null);
              }
            });
          }
        });
      } else {
        callback(null, entry);
      }
    });
  };

  citybikes.findStations = function(networkName, options, callback) {
    var key = 'Stations_' + networkName,
      type = 'Citybikes';

    koop.Cache.get(type, key, options, function(cacheErr, entry) {
      if (cacheErr) {
        citybikesJs.stations(networkName, function(err, stations) {
          if (err) {
            callback(err, null);
          } else {
            var output = [{
              features: stations
            }];
            koop.Cache.insert(type, key, output, 0, function(insertErr, success) {
              if (success) {
                callback(null, output);
              } else {
                callback(insertErr, null);
              }
            });
          }
        });
      } else {
        callback(null, entry);
      }
    });
  };
  return citybikes;
};

module.exports = Citybikes;