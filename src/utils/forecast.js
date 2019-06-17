const request = require('request')

const DarkSkyToken = '41a5690df193b82730b43ab21188e34f'

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/${DarkSkyToken}/${encodeURIComponent(longitude)},${encodeURIComponent(latitude)}?units=si`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to the service', undefined)
    } else if (body.error) {
      callback(body.error, undefined)
    } else {
      const { temperature, precipProbability } = body.currently
      const { summary } = body.daily.data[0]
      callback(undefined, { 
        temp: temperature, 
        rain: precipProbability,
        summary
      })
    }
  })
}

module.exports = forecast