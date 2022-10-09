import {AppointmentDetails, WeatherData} from "../../DataSource/types";
import {Box, Typography} from "@mui/material";
import AppointmentDetailsDialog from "./AppointmentDetailsDialog";
import {useEffect, useState} from "react";
import {getWeatherByLatAndLon, getWeatherByLocationName} from "../Openweather/OpenweatherApiInformation";

type AppointmentHolderProps = {
    appointment: AppointmentDetails,
    longitude: number,
    latitude: number
}

export const AppointmentHolder = (props: AppointmentHolderProps) => {

    const [open, setOpen] = useState(false);
    const [weather, setWeather] = useState<WeatherData>({weather:"",temp: 0, iconUrl: "", city: ""});


    useEffect(() => {
        if (props.appointment.location !== "No location") {
            getWeatherByLocationName(props.appointment.location).then(response => {
                let weatherData: WeatherData = {
                    weather: response.data.weather[0].main,
                    temp: response.data.main.temp,
                    iconUrl: "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png",
                    city: response.data.name
                };
                setWeather(weatherData);
            });
        } else {

            getWeatherByLatAndLon(props.latitude, props.longitude).then(response => {
                let weatherData: WeatherData = {
                    weather: response.data.weather[0].main,
                    temp: response.data.main.temp,
                    iconUrl: "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png",
                    city: response.data.name
                };
                setWeather(weatherData);
            });
        }
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const convertMinutesToPixels = (minutes: number) => {
        return 720 / 1440 * minutes;
    }
    const convertMillisToMins = (millis: number) => {
        return millis / 1000 / 60;
    }

    const getDuration = (start: string, end: string) => {
        let startTime = new Date(start).getTime();
        let endTime = new Date(end).getTime();
        return convertMinutesToPixels(convertMillisToMins(Math.abs(startTime - endTime))); //convert milliseconds to min
    }

    const getYOffset = (start: string) => {
        let date = new Date(start);
        let yearTime = new Date(start.substring(0, 10).concat("T00:00:00")).getTime();
        let startTime = date.getTime() - yearTime;

        return convertMinutesToPixels(convertMillisToMins(startTime));
    }

    const getColor = (color: string) => {
        switch (color) {
            case "support1":
                return "orchid";
            case "support2":
                return "lightskyblue";
            case "support4":
                return "greenyellow";
            case  "support5":
                return "limegreen";
            case "support6":
                return "coral";
            default:
                return "orange";
        }
    }

    return (
        <>
            <Box
                style={{
                    background: getColor(props.appointment.color),
                    border: "1px solid black",
                    borderRadius: "5px",
                    maxWidth: "500px",
                    width: "350px",
                    position: 'absolute',
                    height: getDuration(props.appointment.start, props.appointment.end),
                    top: getYOffset(props.appointment.start) - 1,
                    left: 100,
                }}
                onClick={handleClickOpen}
            >
                <Typography variant="subtitle1" > {props.appointment.color} </Typography>
            </Box>
            <AppointmentDetailsDialog open={open} onClose={handleClickClose} appointment={props.appointment}  latitude={props.latitude} longitude={props.longitude} weather={weather}/>
        </>
    )
}

export default AppointmentHolder;