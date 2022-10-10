import {AppointmentHolderProps, WeatherData} from "../../DataSource/types";
import {Box, Typography} from "@mui/material";
import AppointmentDetailsDialog from "./AppointmentDetailsDialog";
import {useEffect, useState} from "react";
import {getWeatherByLatAndLon, getWeatherByLocationName} from "../Openweather/OpenweatherApiInformation";
import {getColor, getDuration, getYOffset} from "../TransformerFunctions";

export const AppointmentHolder = (props: AppointmentHolderProps) => {

    const [open, setOpen] = useState(false);
    const [weather, setWeather] = useState<WeatherData>({weather: "", temp: 0, iconUrl: "", city: ""});

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        if (props.appointment.location !== "No location") {
            getWeatherByLocationName(props.appointment.location).then(response => {
                if(response.status === 200) {
                    let weatherData: WeatherData = {
                        weather: response.data.weather[0].main,
                        temp: response.data.main.temp,
                        iconUrl: "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png",
                        city: response.data.name
                    };
                    setWeather(weatherData);
                }
            });
        } else {
            getWeatherByLatAndLon(props.latitude, props.longitude).then(response => {
                if(response.status === 200){
                    let weatherData: WeatherData = {
                        weather: response.data.weather[0].main,
                        temp: response.data.main.temp,
                        iconUrl: "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png",
                        city: response.data.name
                    };
                    setWeather(weatherData);
                }
            });
        }
    }, []);

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
                <Typography variant="subtitle1"> {props.appointment.color} </Typography>
            </Box>
            <AppointmentDetailsDialog open={open} onClose={handleClickClose} appointment={props.appointment}
                                      latitude={props.latitude} longitude={props.longitude} weather={weather}/>
        </>
    )
}

export default AppointmentHolder;