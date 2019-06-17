console.log('Client side JavaScript file loaded')

const clearFields = () => {
  document.querySelector('#location').textContent = ''
  document.querySelector('#temperature').textContent = ''
  document.querySelector('#forecast').textContent = ''
  document.querySelector('#rain').textContent = ''
  document.querySelector('.searchMessage').textContent = ''
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  document.querySelector('.searchMessage').textContent = 'Loading...'
  
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        document.querySelector('.searchMessage').textContent = ''
      if (data.error) {
        search.value = ''
        clearFields()
        return document.querySelector('.searchMessage').textContent = data.error
      }

      const { location, temperature, rain, forecast} = data
      document.querySelector('#location').textContent = location
      document.querySelector('#temperature').textContent = `${temperature} C`
      document.querySelector('#forecast').textContent = forecast
      document.querySelector('#rain').textContent = rain
      search.value = ''
    })
  })
})

search.addEventListener('keydown', () => {
  clearFields()
})
