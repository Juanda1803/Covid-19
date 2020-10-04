import React from 'react'

import '../assets/styles/components/Table.css'

const Table = ({ countries }) => {
  return (
    <div className='table'>
      {countries.map(({ country, cases, countryInfo, todayCases }, id) => {
        let className = 'gray'
        if (id % 2 == 1) {
          className += 'gray'
        }
        return (
          <thead key={id}>
            <tr className={className}>
              <td>{id + 1}</td>
              <td className='country__name'>
                <img src={countryInfo.flag} width='40' />
                {country}
              </td>
              <td className='country__cases'>
                <strong>{cases}</strong>
              </td>
              <td className='country__todayCases'>
                <strong> + {todayCases}</strong>
              </td>
            </tr>
          </thead>
        )
      })}
    </div>
  )
}

export default Table
