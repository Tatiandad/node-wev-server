const request = require('request')

const MapBoxToken = 'pk.eyJ1IjoiZHlzaGxhdmF5YSIsImEiOiJjandhd3AyNm0wZWxhNDNsancwdnlwYXB3In0.-QqnLs2yOFKtbO4dPNKiAQ'

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${encodeURIComponent(MapBoxToken)}`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the service', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location. Try another search', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0]['place_name']
      })
    }
  })
}

module.exports = geocode