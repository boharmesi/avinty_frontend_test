import axios, {AxiosResponse} from "axios";

export const WEATHER_URL = "https://api.openweathermap.org/";
const WEATHER_API = WEATHER_URL + "data/2.5/weather?";

let API_KEY = "";
export const setApiKey = (key: string) => {
    API_KEY = key;
};
const kacsa = {
    "data": {
        "coord": {
            "lon": 19.0399,
            "lat": 47.498
        },
        "weather": [
            {
                "id": 800,
                "main": "Clear",
                "description": "clear sky",
                "icon": "01n"
            }
        ],
        "main": {
            "temp": 17
        }
    }
}

/*let promise = new Promise<AxiosResponse<any, any>>((resolve) => {
    resolve (kacsa)
})*/

export const apiTest = (key: string | null)  =>
    //promise
axios.get(WEATHER_API + "q=Budapest&units=metric&appid=" + key);

export const getWeatherByLocationName = (location: string) =>
    //promise
axios.get(WEATHER_API + "q=" + location + "&units=metric&appid=" + API_KEY);

export const getWeatherByLatAndLon = (lat: number, lon: number) =>
    //promise
 axios.get(WEATHER_API + "lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + API_KEY);


