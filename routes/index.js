module.exports = {
  
  'get /citybikes/': {
    action: 'index'
  },

  'get /citybikes': {
    action: 'index'
  },

  'get /citybikes/networks': {
    action: 'networks'
  },

  'get /citybikes/networks/FeatureServer': {
    action: 'featureservice'
  },

  'get /citybikes/networks/FeatureServer/:layer': {
    action: 'featureservice'
  },

  'get /citybikes/networks/FeatureServer/:layer/:method': {
    action: 'featureservice'
  },

  'get /citybikes/network/:networkName': {
    action: 'stations'
  },

  'get /citybikes/network/:networkName/FeatureServer': {
    action: 'featureservice'
  },

  'get /citybikes/network/:networkName/FeatureServer/:layer/:method': {
    action: 'featureservice'
  },

  'get /citybikes/network/:networkName/FeatureServer/:layer': {
    action: 'featureservice'
  }
}
