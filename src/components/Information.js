import React, { useState, useEffect } from 'react'
import { useUser } from 'reactfire'
import { FormControl, Select, MenuItem } from '@material-ui/core'
import numeral from 'numeral'
import Table from './Table'
import { sortData } from './Util'
import '../assets/styles/components/Information.css'

const Information = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [casesType, setCasesType] = useState('cases')

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => ({
            name: country.country,
            value: country.countryInfo.iso2
          }))
          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries)
        })
    }
    getCountries()
  }, [])
  const handleChange = async e => {
    const countryCode = await e.target.value
    setCountry(countryCode)
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountry(countryCode)
        setCountryInfo(data)
      })
  }
  const user = useUser()
  let className = ''
  let classNameHero = ''
  if (!user) {
    className += 'hero__container--infoBox'
  } else {
    classNameHero += 'hero'
    className += 'hero__infoBox'
  }

  return (
    <div className={classNameHero}>
      <div className={className}>
        <div className='hero-infoBox__item'>
          <h2>Casos de Coronavirus</h2>
          <h1>{numeral(countryInfo.todayCases).format('0,0')}</h1>
          <h3>
            Total = {countryInfo.cases}
            {numeral(countryInfo.cases).format('0,0')}
          </h3>
        </div>

        <div className='hero-infoBox__item green'>
          <h2>Recuperados</h2>
          <h1>{numeral(countryInfo.todayRecovered).format('0,0')}</h1>
          <h3>Total = {numeral(countryInfo.recovered).format('0,0')}</h3>
        </div>

        <div className='hero-infoBox__item red'>
          <h2>Muertos</h2>
          <h1>{numeral(countryInfo.todayDeaths).format('0,0')}</h1>
          <h3>Total = {numeral(countryInfo.deaths).format('0,0')}</h3>
        </div>
      </div>

      {user && (
        <>
          <div className='hero__container'>
            <FormControl className='hero__select'>
              <Select
                onChange={handleChange}
                variant='outlined'
                value={country}
              >
                <MenuItem value='worldwide'>Todo el Mundo</MenuItem>
                {countries.map(country => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className='hero-table'>
            <div className='hero-table__container'>
              <h3 className='hero-table__title'>
                Casos de Coronavirus en vivo
              </h3>
              <Table countries={tableData} />
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Information
