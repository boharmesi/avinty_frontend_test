import axios from "axios";

export const WEATHER_URL = "https://api.openweathermap.org/";
const WEATHER_API = WEATHER_URL + "data/2.5/weather?";

export const getWeatherByLocationName = (location: string) =>
    axios.get(WEATHER_API + "q=" + location + "&units=metric&appid=" + "84c17deabf82d3d6f9005ed82ab47cbc");

export const getWeatherByLatAndLon = (lat: number, lon: number) =>
    axios.get(WEATHER_API + "lat=" + lat + "&lon=" + lon + "&appid=" + "84c17deabf82d3d6f9005ed82ab47cbc");

/*https://api.openweathermap.org/data/2.5/weather?q=Budapest&units=metric&appid=84c17deabf82d3d6f9005ed82ab47cbc*/
/*https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}*/

