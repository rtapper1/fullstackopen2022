import axios from 'axios'

const baseUrl = 'https://restcountries.com/'
const version = 'v3.1'

const getAllCountries = () => (
    axios
        .get(`${baseUrl}/${version}/all`)
        .then(res => res.data)
)

export default {getAllCountries}