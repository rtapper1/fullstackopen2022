import { useState, useEffect } from 'react'

import countryService from "./services/countries"
import weatherService from './services/weather'
import SearchBar from "./components/SearchBar"
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'

const App = () => {
  // State hooks
  const [searchValue, setSearchValue] = useState('')
  const [countries, setCountries] = useState([])
  const [activeView, setActiveView] = useState('list')
  const [countriesToShow, setCountriesToShow] = useState([])

  // Effect hooks
  useEffect(() => {
    countryService
      .getAllCountries()
      .then((response) => {
        setCountries(response)
        setCountriesToShow(response)
      })
      .catch((err) => {
        console.log(`Something went wrong getting country-data: ${err}`)
      })
  }, [])

  useEffect(() => {
    setCountriesToShow(
      countries.filter(country => {
        return (
        country
          .name
          .common
          .toLowerCase()
          .includes(
            searchValue.toLowerCase()
          )
        )
      })
    )
  }, [countries, searchValue])

  useEffect(() => {
    if (countriesToShow.length === 1) {
      setActiveView('details')
    }
    else if (countriesToShow.length > 1) {
      setActiveView('list')
    }
  }, [countriesToShow])

  // Handlers
  const handleSearchValueChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleClick = (country_id) => {
    setCountriesToShow(
      countriesToShow.filter(
        country => country.ccn3 === country_id
      )
    )
  }

  const chooseView = () => {
    if (activeView === 'list') {
      return (<CountryList
      countries={countriesToShow}
      handleClick={handleClick} />)
    }
    else {
      console.log('We are in else-statement')
      return (<CountryDetails
        country={countriesToShow[0]}/>)
    }
  }

  return (
    <div>
      <SearchBar 
        value={searchValue}
        setSearchValue={handleSearchValueChange} />
      {chooseView()}
    </div>
  )
}

export default App
