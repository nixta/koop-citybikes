module.exports = {
  
  'get /citybikes/': {
    controller: 'citybikes',
    action: 'index'
  },

  'get /citybikes': {
    controller: 'citybikes',
    action: 'index'
  },

  'get /citybikes/networks': {
    controller: 'citybikes',
    action: 'networks'
  },

  'get /citybikes/networks/:networkName': {
    controller: 'citybikes',
    action: 'stations'
  },

  'get /citybikes/networks/FeatureServer': {
    controller: 'citybikes',
    action: 'featureservice'
  },

  'get /citybikes/networks/FeatureServer/:layer': {
    controller: 'citybikes',
    action: 'featureservice'
  },

  'get /citybikes/networks/:networkName/FeatureServer': {
    controller: 'citybikes',
    action: 'featureservice'
  },

  'get /citybikes/networks/:networkName/FeatureServer/:layer': {
    controller: 'citybikes',
    action: 'featureservice'
  }//,

  // 'get /citybikes/:user/:repo/FeatureServer/:layer/:method': {
  //   controller: 'citybikes',
  //   action: 'featureservice'
  // },

  // 'get /citybikes/:user/:repo/:file.:format': {
  //   controller: 'citybikes',
  //   action: 'getRepo'
  // },

  // 'get /citybikes/:user/:repo/:file': {
  //   controller: 'citybikes',
  //   action: 'getRepo'
  // },

  // 'get /citybikes/:user/:repo/:file/preview': {
  //   controller: 'citybikes',
  //   action: 'preview'
  // },

  // 'get /citybikes/:user/:repo/:file/FeatureServer': {
  //   controller: 'citybikes',
  //   action: 'featureservice'
  // },

  // 'get /citybikes/:user/:repo/:file/FeatureServer/:layer': {
  //   controller: 'citybikes',
  //   action: 'featureservice'
  // },

  // 'get /citybikes/:user/:repo/:file/FeatureServer/:layer/:method': {
  //   controller: 'citybikes',
  //   action: 'featureservice'
  // },

  // 'get /citybikes/:user/:repo/:file/thumbnail' : {
  //   controller: 'citybikes',
  //   action: 'thumbnail'
  // },

  // 'get /github/:user/:repo/:file/tiles/:z/:x/:y.:format': { 
  //   controller: 'citybikes',
  //   action: 'tiles'
  // },

  // 'get /github/:user/:repo/:file/:layer/tiles/:z/:x/:y.:format': { 
  //   controller: 'citybikes',
  //   action: 'tiles'
  // }

}
