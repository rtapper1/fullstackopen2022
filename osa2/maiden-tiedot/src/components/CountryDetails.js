import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const CountryName = (props) => (
    <h1>{props.country.name.common}</h1>
)

const CountryCapital = (props) => (
    <div>capital {props.country.capital.map(city => `${city} `)}</div>
)

const CountryArea = (props) => (
    <div>area {props.country.area}</div>
)

const CountryLanguages = (props) => (
    <div>
        <h2>languages:</h2>
        <ul>
            {Object.entries(props.country.languages).map(language => (<li key={language[0]}>{language[1]}</li>))}
        </ul>
    </div>
)

const CountryFlag = (props) => (
    <div>
        <img src={props.country.flags.png} alt={`Flag of the country ${props.country.name}`} />
    </div>
)

const WeatherTitle = (props) => (
    <h2>Weather in {props.country.capital[0]}</h2>
)

const WeatherData = (props) => (
    props.weather && (
        <>
            <p>temperature {props.weather.main.temp - 273.15} Celsius</p>
            <img src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`} alt="Weather icon" />
            <p>wind {props.weather.wind.speed} m/s</p>
        </>
    )
)

const CountryWeather = (props) => {
    const [weather, setWeather] = useState(null)
    useEffect(() => {
        weatherService
            .getCapitalWeather(props.country)
            .then((res) => setWeather(res))
            .catch((err) => console.log(`Failed to fetch weather for ${props.country.capital[0]}!`))
    }, [props.country])
    return (
        <div>
            <WeatherTitle country={props.country} />
            <WeatherData weather={weather} />
        </div>
    )
}

const CountryDetails = (props) => (
    props.country && (
        <div>
            <CountryName country={props.country} />
            <CountryCapital country={props.country} />
            <CountryArea country={props.country} />
            <CountryLanguages country={props.country} />
            <CountryFlag country={props.country} />
            <CountryWeather country={props.country} weather={props.weather}/>
        </div>
    )
)

export default CountryDetails