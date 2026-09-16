import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  useEffect(() => {
    if (!selectedCountry) {
      setWeather(null)
      return
    }

    const capital = selectedCountry.capital[0]

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
      )
      .then(response => {
        setWeather(response.data)
      })
      .catch(() => {
        setWeather(null)
      })
  }, [selectedCountry])

  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const showCountry = country => {
    setSelectedCountry(country)
  }

  const country = selectedCountry || (
    countriesToShow.length === 1 ? countriesToShow[0] : null
  )

  return (
    <div>
      find countries <input
        value={search}
        onChange={event => {
          setSearch(event.target.value)
          setSelectedCountry(null)
        }}
      />

      {countriesToShow.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}

      {countriesToShow.length <= 10 &&
        countriesToShow.length > 1 &&
        !selectedCountry &&
        countriesToShow.map(country =>
          <p key={country.cca3}>
            {country.name.common}
            <button onClick={() => showCountry(country)}>
              show
            </button>
          </p>
        )
      }

      {country && (
        <div>
          <h1>{country.name.common}</h1>

          <p>capital {country.capital}</p>
          <p>area {country.area}</p>

          <h2>languages:</h2>
          <ul>
            {Object.values(country.languages).map(language =>
              <li key={language}>{language}</li>
            )}
          </ul>

          <img
            src={country.flags.png}
            alt={`flag of ${country.name.common}`}
            width="150"
          />

          <h2>Weather in {country.capital}</h2>

          {weather && (
            <div>
              <p>temperature {weather.main.temp} Celsius</p>

              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />

              <p>wind {weather.wind.speed} m/s</p>
            </div>
          )}

          {!weather && (
            <p>Loading weather...</p>
          )}
        </div>
      )}
    </div>
  )
}

export default App