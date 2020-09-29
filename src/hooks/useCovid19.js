import { useState, useEffect } from 'react'

const useCovid19 = API => {
  const [infected, setInfected] = useState([])
  useEffect(async () => {
    try {
      const resolve = await fetch(API)
      const data = resolve.json()
      const use = setInfected(data)
      console.log(use)
    } catch (error) {
      console.log(error)
    }
  }, [])
  return infected
}

export default useCovid19
