import React, { useState } from "react";
import axios from "axios";

const SearchCity = ({ getWeatherDetails }) => {
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

    try {
      const response = await axios.get(
        apiUrl + searchedCity + `&appid=${api_key}`
      );

      getWeatherDetails(response);
    } catch (error) {
      setError("City not found. Please try another location.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="w-full">
        <form
          action=""
          onSubmit={handleSearchCity}
          className="flex flex-col items-center space-y-4"
        >
          <div className="relative w-full">
            <input
              type="text"
              name=""
              id=""
              placeholder="Search for a city"
              className="outline-none rounded-xl border border-gray-200 w-full p-4 pr-12 focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-gray-700"
              onChange={(e) => setSearchedCity(e.target.value)}
              value={searchedCity}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition-colors duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Loading" : "Search"}
            </button>
          </div>

          {error && <div className="text-red-500 text-sm ">{error}</div>}
        </form>
      </div>
    </>
  );
};

export default SearchCity;
