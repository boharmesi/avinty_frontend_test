import {DialogProps} from "../../DataSource/types";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Typography} from "@mui/material";

const AppointmentDetailsDialog = (props: DialogProps) => {

    const startDate = new Date(props.appointment.start.concat("Z")).toUTCString();
    const endDate = new Date(props.appointment.end.concat("Z")).toUTCString();

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
                            <img src={props.weather.iconUrl} alt={props.weather.weather}/>
                            <Typography variant="subtitle1">
                                {props.weather.temp} Cº
                            </Typography>
                        </Grid>
                        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                            <Typography variant="subtitle1">
                                {props.weather.weather}
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
                        <Typography
                            variant="subtitle1">Location: {props.latitude} {props.longitude} {props.weather.city}</Typography>
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