import React, { Suspense, useState } from "react"; 
import axios from "axios";
import "./App.css";

// Lazy loaded components 
const Weather = React.lazy(() => import('./components/Weather'));
const SearchCity = React.lazy(() => import('./components/SearchCity'));
const CurrencyConverter = React.lazy(() => import('./components/CurrencyConverter'));

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [country, setCountry] = useState(null);

  const getWeatherDetails = (response) => {
    const { main, weather, wind, sys } = response.data;
    setCurrentWeather({
      temperature: main.temp,
      description: weather[0].main,
      feels_like: main.feels_like,
      humidity: main.humidity,
      wind: wind.speed
    });
    setCountry(sys.country);
    setIsSearching(true);
  };

  return (
    <div className="min-h-screen bg-blue-300 flex flex-col items-center justify-center p-4">
      {/* search suspense  */}
      <Suspense fallback={<div className="w-full max-w-md p-6">Loading search...</div>}>
        <div className={`w-full max-w-md transition-all duration-500 z-10 ease-in-out ${
          isSearching ? "mt-0" : "mt-auto"
        }`}>
          <div className={`bg-white p-6 rounded-2xl transition-all duration-500 ease-in-out ${
            isSearching ? "translate-y-0" : "translate-y-[20vh]"
          }`}>
            <SearchCity getWeatherDetails={getWeatherDetails} />
          </div>
        </div>
      </Suspense>

      {/*  weather suspense */}
      {isSearching && (
        <Suspense fallback={<div className="w-full max-w-md p-6">Loading weather data...</div>}>
          {currentWeather && (
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
        </Suspense>
      )}

      <div className={`flex-grow transition-all duration-300 ${
        isSearching ? "h-16" : "h-auto"
      }`}></div>
    </div>
  );
}

export default App;