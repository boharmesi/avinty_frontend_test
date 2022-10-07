import {AppointmentDetails, WeatherData} from "../types";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {getWeatherByLatAndLon, getWeatherByLocationName} from "./WeatherInformation";
import {useGeoLocation} from 'use-geo-location';


type DialogProps = {
    open: boolean;
    onClose: () => void;
    appointment: AppointmentDetails;
}

const AppointmentDetailsDialog = (props: DialogProps) => {

   const geoObj = useGeoLocation();
   const location = geoObj.latitude + " " + geoObj.longitude;
   console.log(geoObj.loading);
   console.log(geoObj.latitude + "     " + geoObj.longitude);

    const startDate = new Date(props.appointment.start.concat("Z")).toUTCString();
    const endDate = new Date(props.appointment.end.concat("Z")).toUTCString();

    const [weather, setWeather] = useState<WeatherData>();


    useEffect(() => {
        const getWeatherData = async () => {
            if(props.appointment.location !== "No location") {
                const response = await getWeatherByLocationName(props.appointment.location);
                let weatherData: WeatherData = {
                    weather: response.data.weather[0].main,
                    temp: response.data.main.temp,
                    iconUrl: "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
                };
                setWeather(weatherData);
            } else {
                const response = await getWeatherByLatAndLon(geoObj.latitude, geoObj.longitude);
                let weatherData: WeatherData = {
                    weather: response.data.weather[0].main,
                    temp: response.data.main.temp,
                    iconUrl: "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
                };
                setWeather(weatherData);
            }

        }
        getWeatherData().then();
    }, [!geoObj.loading])

    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth={true}>
            <DialogTitle>
                <Grid container display={"flex"} alignItems={"center"}>
                    <Grid item xs={9}>
                        {startDate.substring(5, 22)} - {endDate.substring(5, 22)}
                    </Grid>
                    <Grid item xs={3}>
                        <Grid item container xs={12} display={"flex"} direction={"row"} alignItems={"center"}
                              justifyContent={"center"}>
                            <img src={weather?.iconUrl} alt={weather?.weather}/>
                            <Typography variant="subtitle1">
                                {weather?.temp} Cº
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                            <Typography variant="subtitle1">
                                {weather?.weather}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Divider textAlign="left" style={{color: "#E38B29"}}>
                    Additional information
                </Divider>
                <Typography variant="subtitle1">Title: {props.appointment.title}</Typography>
                {props.appointment.location !== "No location" ?
                    (
                        <Typography variant="subtitle1">Location: {props.appointment.location}</Typography>
                    ) : (
                        <Typography variant="subtitle1">Location: {location}</Typography>
                    )
                }

            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} style={{color: "orangered"}}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AppointmentDetailsDialog;