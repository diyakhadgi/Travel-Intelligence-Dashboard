import React from 'react'
import weatherIcons from '../constants.js';

const Weather = ({ currentWeather }) => {
  const weather = currentWeather.description ? currentWeather.description.toLowerCase() : '';
  const icon = weatherIcons[weather]
  
  return (
    <>
      <div>
        <div>
          <img src={icon} alt="" />
          <h2>{Math.floor(currentWeather.temperature)} <span>°C</span></h2>
          <p>{currentWeather.description }</p>
        </div>
       
      </div>
    </>
  )
}

export default Weather