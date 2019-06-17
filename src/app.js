const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const componentsPath = path.join(__dirname, '../templates/components')
const viewsPath = path.join(__dirname, '../templates/views')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(componentsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather Title',
    name: 'Boho'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page with HBS',
    name: 'Boho'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page with HBS',
    message: 'We are here to help! What would a problem for you?',
    name: 'Boho'
  })
})

app.get('/weather', (req, res) => {
  const location = req.query.address
  if (!req.query.address) {
    return res.send({
      error: 'You must provide address'
    })
  }
   
  geocode(location, (error, { latitude=0, longitude=0, location='' } = {}) => {
    if (error) {
      return res.send({ error })
    }
  
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      const { temp, rain, summary, min, max } = forecastData
      res.send({
        address: req.query.address,
        location,
        temperature: temp,
        rain: `It is currently ${temp} degrees out. There is a ${rain}% chance of rain`,
        forecast: summary,
        min,
        max
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found',
    name: 'Boho'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
    name: 'Boho'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})