module.exports = {
  'get /citybikes/': 'index',
  'get /citybikes': 'index',
  'get /citybikes/networks/': 'networks',
  'get /citybikes/networks': 'networks',
  'get /citybikes/networks/FeatureServer': 'featureservice',
  'get /citybikes/networks/FeatureServer/:layer': 'featureservice',
  'get /citybikes/networks/FeatureServer/:layer/:method': 'featureservice',
  'get /citybikes/network/:networkName': 'stations',
  'get /citybikes/network/:networkName/FeatureServer': 'featureservice',
  'get /citybikes/network/:networkName/FeatureServer/:layer/:method': 'featureservice',
  'get /citybikes/network/:networkName/FeatureServer/:layer': 'featureservice'
}
