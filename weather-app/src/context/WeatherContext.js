import { useContext, createContext, useState } from "react";
import JSONData from "../data/CitiesOfTurkey.json";

const WeatherContext = createContext();

export const WeatherProvider = ({children}) => {
    const [city, setCity] =useState(JSONData.find(item => item.id === 35));

    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("darkMode") || ""
        );

    const [weatherData, setWeatherData] = useState([]);

    const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const values = {
        city,
        setCity,
        weatherData,
        setWeatherData,
        darkMode,
        setDarkMode,
        JSONData,
        days,        
        
    };

    return(
        <WeatherContext.Provider value={values}>{children}</WeatherContext.Provider>
    )
}

export const useWeather = () => useContext(WeatherContext);

