import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const getCapitalCoordinates = (country) => (
    axios
        .get(`http://api.openweathermap.org/geo/1.0/direct?q=${country.capital[0]},${country.cca2}&appid=${api_key}`)
        .then(res => [res.data[0].lat, res.data[0].lon])
)

const getCapitalWeather = (country) => (
    getCapitalCoordinates(country)
        .then(res => axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${res[0]}&lon=${res[1]}&appid=${api_key}`))
        .then(res => res.data)
)

export default { getCapitalWeather }