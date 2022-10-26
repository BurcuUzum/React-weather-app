import axios from "axios";
import { useEffect } from "react";
import { useWeather } from "../context/WeatherContext";

function Days() {
  const { city, days, darkMode, weatherData, setWeatherData } = useWeather();

  useEffect(() => {
    const api_key = "779c271986d91ab4f86362ce5d62e73c";
    const getData = async () => {
      const res = axios(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${city.latitude}&lon=${city.longitude}&exclude={part}&appid=${api_key}`
      );
      console.log((await res).data.daily);
      setWeatherData((await res).data.daily);
    };
    getData();
    localStorage.setItem("darkMode", darkMode);
  }, [city, setWeatherData, darkMode]);

  return (
    <div className="days-container">
      {weatherData.map((item, index) => {
        return (
          <div className="day" key={index}>
            <div className="day-title">
              <span>{days[new Date(item.dt * 1000).getDay()]}</span>
            </div>
            <img
              className="day-img"
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
              title={item.weather[0].description}
            />
            <div className="day-deg">
              <span className="tmp-high">
                {Math.round(item.temp["max"] - 273.15)}
                &deg;
              </span>
              <span>
                {Math.round(item.temp["min"] - 273.15)}
                &deg;
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Days;
