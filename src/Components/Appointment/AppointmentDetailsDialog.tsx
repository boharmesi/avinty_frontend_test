import {AppointmentDetails, WeatherData} from "../../DataSource/types";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {getWeatherByLatAndLon, getWeatherByLocationName} from "../Openweather/OpenweatherApiInformation";
import {useGeoLocation} from 'use-geo-location';


type DialogProps = {
    open: boolean;
    onClose: () => void;
    appointment: AppointmentDetails;
}

const AppointmentDetailsDialog = (props: DialogProps) => {

    const geoObj = useGeoLocation();
    const location = geoObj.latitude + " " + geoObj.longitude;


    const startDate = new Date(props.appointment.start.concat("Z")).toUTCString();
    const endDate = new Date(props.appointment.end.concat("Z")).toUTCString();

    const [weather, setWeather] = useState<WeatherData>();

    useEffect(() => {
        if (props.appointment.location !== "No location") {
            getWeatherByLocationName(props.appointment.location).then(response => {
                let weatherData: WeatherData = {
                    weather: response.data.weather[0].main,
                    temp: response.data.main.temp,
                    iconUrl: "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
                };
                setWeather(weatherData);
            });

        }
    }, []);

    useEffect(() => {
        if (geoObj.latitude !== undefined && geoObj.longitude !== undefined) {
            //console.log(geoObj.latitude + " " + geoObj.longitude);
            getWeatherByLatAndLon(geoObj.latitude, geoObj.longitude).then(response => {
                let weatherData: WeatherData = {
                    weather: response.data.weather[0].main,
                    temp: response.data.main.temp,
                    iconUrl: "https://openweathermap.org/img/w/" + response.data.weather[0].icon + ".png"
                };
                console.log(weatherData.weather);
                console.log(geoObj);
                setWeather(weatherData);
            });
        }
    }, [weather, geoObj.latitude, geoObj.longitude]);

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