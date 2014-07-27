var citybikes = require('citybikes-js');

exports.findNetworks = function(options, callback ){
  var key = 'Networks',
      type = 'Citybikes';
  
  Cache.get(type, key, options, function(cacheErr, entry){
    if (cacheErr){
      citybikes.networks(function(err, networks) {
        Cache.insert(type, key, networks, 0, function(insertErr, success) {
          if (success) {
            callback(null, networks);
          }
        });
      });
    } else {
      callback( null, entry );
    }
  });
};

      // Geohub.repo( user, repo, file, config.github_token, function( err, geojson ){
      //   if ( !geojson || err ){
      //     callback( 'No geojson found', null );
      //   } else {

      //     if ( !geojson.length ){
      //       geojson = [ geojson ];
      //     }

      //     var _totalLayer = geojson.length,
      //       finalJson = [];
      //     // local method to collect layers and send them all
      //     var _send = function(data){
      //       finalJson.push(data);
      //       if ( finalJson.length == _totalLayer ) {
      //         callback(null, finalJson);
      //       }
      //     };

      //     geojson.forEach(function(layer, i){
      //       if (!layer.name) { 
      //         layer.name = file.replace('.geojson','');
      //       }
      //       Cache.insert( type, key, layer, i, function( err, success){
      //         if ( success ) {
      //           _send(layer);
      //         } //callback( null, geojson );
      //       });
      //     });
      //   }
      // });

// compares the sha on the cached data and the hosted data
// this method name is special reserved name that will get called by the cache model
/*exports.checkCache = function(key, data, options, callback){
  var json = data;
  key = key.split('/');
  var user = key.shift();
  var repo = key.shift();
  var path = key.join('/') + '.geojson';

  Geohub.repoSha(user, repo, path, config.github_token, function(err, sha){
    
    if ( sha == json[0].sha ){
      callback(null, false);
    } else {
      Geohub.repo( user, repo, path, config.github_token, function( err, geojson ){
        callback(null, geojson );
      });
    }
  });
};*/
