import React, { Suspense, useEffect, useState } from "react";
import "./App.css";

const Weather = React.lazy(() => import("./components/Weather"));
const SearchCity = React.lazy(() => import("./components/SearchCity"));
const CurrencyConverter = React.lazy(() =>
  import("./components/CurrencyConverter")
);

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [recentCities, setRecentCities] = useState([]);
  const [activeCity, setActiveCity] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); 

  const getWeatherDetails = (weatherData) => {
    setCurrentWeather(weatherData);
    setHasSearched(true); 
  };

  const handleRecentClick = (city) => {
    const cached = localStorage.getItem(`weatherData_${city}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      setCurrentWeather(parsed);
      console.log('Weather ', currentWeather)
      setActiveCity(city);
      setHasSearched(true);
    } else {
      alert("Data not found.");
    }
  };

  useEffect(() => {
    const storedCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    setRecentCities(storedCities);
  }, []);

  return (
    <div className="min-h-screen bg-blue-300 flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="w-full max-w-md p-6">Loading search...</div>}>
        <div className="w-full max-w-md bg-white p-6 rounded-2xl">
          <SearchCity
            getWeatherDetails={getWeatherDetails}
            setRecentCities={setRecentCities}
            setActiveCity={setActiveCity}
          />
        </div>
      </Suspense>

     
      {recentCities.length > 0 && hasSearched && (
        <div className="mt-4 text-center">
          <h4 className="font-semibold text-white mb-2">Recent Cities</h4>
          <div className="flex gap-2 justify-center flex-wrap">
            {recentCities.map((city, idx) => (
              <button
                key={idx}
                onClick={() => handleRecentClick(city)}
                className={`px-4 py-2 rounded-xl text-sm transition ${
                  city === activeCity
                    ? "bg-gray-500 text-white"
                    : "bg-white hover:bg-blue-100"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentWeather && (
        <Suspense fallback={<div className="w-full max-w-md p-6">Loading weather...</div>}>
          <div className="w-full max-w-md space-y-4 mt-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <Weather currentWeather={currentWeather} />
            </div>

            {currentWeather.countryCode && (
              <div className="mt-4">
                <CurrencyConverter countryCode={currentWeather.countryCode} />
              </div>
            )}
          </div>
        </Suspense>
      )}
    </div>
  );
}

export default App;
