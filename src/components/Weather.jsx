import React from "react";
import weatherIcons from "../constants.js";

const Weather = ({ currentWeather }) => {
  const weather =
  Array.isArray(currentWeather.weather)
    ? currentWeather.weather[0]?.main?.toLowerCase() || ""
    : currentWeather.weather?.main?.toLowerCase() || "";

  const icon = weatherIcons[weather];

  console.log(currentWeather);

  return (
    <>
      <div className="">
        <div className="flex justify-center mb-4">
          <div className="w-32 h-32">
            <img src={icon} alt="" className="w-full h-full" />
          </div>
        </div>
        <div className="text-center mb-2">
          <h2 className="text-6xl font-bold text-gray-800">
            {Math.floor(currentWeather.main.temp)}
            <span className="text-4xl text-gray-600">°C</span>
          </h2>
        </div>
        <div className="text-center">
          <p className="text-2xl font-medium text-gray-600 mt-10">
            {currentWeather.weather.main}
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <div className="text-center">
            <span className="block text-sm text-gray-500">Humidity</span>
            <span className="font-medium">
              {currentWeather.main.humidity}%
            </span>
          </div>
          <div className="text-center">
            <span className="block text-sm text-gray-500">Wind</span>
            <span className="font-medium">
              {currentWeather.wind.speed} km/h
            </span>
          </div>
          <div className="text-center">
            <span className="block text-sm text-gray-500">Feels Like</span>
            <span className="font-medium">{currentWeather.main.feels_like}°C</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
