import React from 'react'

import '../assets/styles/components/Table.css'

const Table = ({ countries }) => {
  return (
    <div className='table'>
      {countries.map(({ country, cases }, id) => {
        let className = 'gray'
        if (id % 2 == 1) {
          className += 'gray'
        }
        return (
          <tr className={className}>
            <td className='number'>{country}</td>
            <td>
              <strong>{cases}</strong>
            </td>
          </tr>
        )
      })}
    </div>
  )
}

export default Table
