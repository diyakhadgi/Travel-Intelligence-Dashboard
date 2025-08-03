import axios from "axios";
import "./App.css";
import SearchCity from "./components/SearchCity";
import Weather from "./components/Weather";
import { useState } from "react";

function App() {
  const [currentWeather, setCurrentWeather] = useState({});

  const getWeatherDetails = (response) => {
    const temperature = response.data.main.temp;
    const description = response.data.weather[0].main;

    setCurrentWeather({ temperature, description });
  };

  return (
    <>
      <div>
        <div>
          <SearchCity getWeatherDetails={getWeatherDetails} />
        </div>
        <Weather currentWeather={currentWeather} />
      </div>
    </>
  );
}

export default App;
