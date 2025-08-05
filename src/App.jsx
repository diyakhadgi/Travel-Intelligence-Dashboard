import axios from "axios";
import "./App.css";
import SearchCity from "./components/SearchCity";
import Weather from "./components/Weather";
import { useState } from "react";
import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null); 
  const [isSearching, setIsSearching] = useState(false);
  const [country, setCountry] = useState(null);

  const getWeatherDetails = (response) => {
    const temperature = response.data.main.temp;
    const description = response.data.weather[0].main;
    const feels_like = response.data.main.feels_like;
    const humidity = response.data.main.humidity;
    const wind = response.data.wind.speed;
    const countryCode = response.data.sys.country;

    setCurrentWeather({ temperature, description, feels_like, humidity, wind });
    setCountry(countryCode);
    setIsSearching(true);
  };

  return (
    <div className="min-h-screen bg-blue-300 flex flex-col items-center justify-center p-4">
      <div
        className={`w-full max-w-md transition-all duration-500 z-10 ease-in-out ${
          isSearching ? "mt-0" : "mt-auto"
        }`}
      >
        <div
          className={`bg-white p-6 rounded-2xl transition-all duration-500 ease-in-out ${
            isSearching ? "translate-y-0" : "translate-y-[20vh]"
          }`}
        >
          <SearchCity getWeatherDetails={getWeatherDetails} />
        </div>
      </div>

      {isSearching && currentWeather && (
        <div className="w-full max-w-md space-y-4">
          <div className="transition-all duration-700 ease-in-out opacity-100 translate-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <Weather currentWeather={currentWeather} />
            </div>
          </div>
          
          {country && (
            <div className="transition-all duration-700 ease-in-out opacity-100 translate-y-4">
              <CurrencyConverter countryCode={country} />
            </div>
          )}
        </div>
      )}

      <div
        className={`flex-grow transition-all duration-300 ${
          isSearching ? "h-16" : "h-auto"
        }`}
      ></div>
    </div>
  );
}

export default App;