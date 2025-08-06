import React, { useState } from "react";
import axios from "axios";

const SearchCity = ({ getWeatherDetails, setRecentCities, setActiveCity }) => {
  const [searchedCity, setSearchedCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const api_key = import.meta.env.VITE_API_KEY;
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

  const handleSearchCity = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!searchedCity.trim()) {
      setError("Please enter a city name.");
      setIsLoading(false);
      return;
    }

    const city = searchedCity.trim();

    // Offline: try load from cache first
    if (!navigator.onLine) {
      const cached = localStorage.getItem(`weatherData_${city}`);
      if (cached) {
        const data = JSON.parse(cached);
        getWeatherDetails(data);
        setActiveCity(city);
        setIsLoading(false);
      } else {
        setError("You're offline and no cached data found for this city.");
        setIsLoading(false);
      }
      return;
    }

    // Online: fetch from API
    try {
      const response = await axios.get(apiUrl + city + `&appid=${api_key}`);

      // Parse relevant info to keep
      const weatherData = {
        temperature: response.data.main.temp,
        description: response.data.weather[0].main,
        feels_like: response.data.main.feels_like,
        humidity: response.data.main.humidity,
        wind: response.data.wind.speed,
        countryCode: response.data.sys.country,
        name: response.data.name,
      };

      // Pass parsed data up to parent
      getWeatherDetails(weatherData);


      // Save to localStorage for offline access
      localStorage.setItem(
        `weatherData_${searchedCity}`,
        JSON.stringify(response.data)
      );

      // Update recent cities
      let storedCities = JSON.parse(localStorage.getItem("recentCities")) || [];
      storedCities = storedCities.filter(
        (city) => city.toLowerCase() !== searchedCity.toLowerCase()
      );
      storedCities.unshift(searchedCity); // Add new city to top
      storedCities = storedCities.slice(0, 3); // Keep max 3
      localStorage.setItem("recentCities", JSON.stringify(storedCities));
      setRecentCities(storedCities);
      setActiveCity(searchedCity);
    } catch (err) {
      setError("City not found. Please try another location.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSearchCity}
        className="flex flex-col items-center space-y-4"
      >
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for a city"
            className="outline-none rounded-xl border border-gray-200 w-full p-4 pr-12 focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-gray-700"
            onChange={(e) => setSearchedCity(e.target.value)}
            value={searchedCity}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-300"
          >
            {isLoading ? "Loading" : "Search"}
          </button>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}
      </form>
    </div>
  );
};

export default SearchCity;
