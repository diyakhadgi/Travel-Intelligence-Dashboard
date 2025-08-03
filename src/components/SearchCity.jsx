import React, { useState } from 'react'
import axios from 'axios';


const SearchCity = ({getWeatherDetails}) => {

  const [searchedCity, setSearchedCity] = useState("");
  const api_key = "729b0136bf28e42be3b5d3b01baff9aa";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


  const handleSearchCity = async(e) => {
    e.preventDefault();
   
      try {
        const response = await axios.get(apiUrl + searchedCity + `&appid=${api_key}`)
        getWeatherDetails(response)
      } catch (error) {
        
      }
    

  }
  return (
    <>
      <div>
        <form action="">
        <input type="text" name="" id="" placeholder='Search' className='border border-black' onChange={(e)=>setSearchedCity(e.target.value)} value={searchedCity} />
          <button className='ml-10 border border-b-blue-900' onClick={handleSearchCity} >Search</button>
          </form>
      </div>
    </>
  )
}

export default SearchCity