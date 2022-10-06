import {AppointmentDetails} from "../types";
import {Box, Typography} from "@mui/material";
import AppointmentDetailsDialog from "./AppointmentDetailsDialog";
import {useState} from "react";
import {format} from "date-fns";

type AppointmentHolderProps = {
    appointment: AppointmentDetails
}

export const AppointmentHolder = (props: AppointmentHolderProps) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(!open);
    }

    const handleClickClose = () => {
        setOpen(!open);

        const str = "2022-10-05T11:30:00Z";
        const date = new Date(str);
        console.log("Local date string " + date.toLocaleDateString('UTC'));
        console.log("Local time string " + date.toLocaleTimeString());
        console.log("UTC string " + date.toUTCString());
        console.log(date.getTimezoneOffset());

    }

    const DIVIDER_HEIGHT = 1;

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

    return (
        <Box
            style={{
                background: "#F1A661",
                border: "1px solid black",
                borderRadius: "5px",
                maxWidth: "500px",
                position: 'absolute',
                height: getDuration(props.appointment.start, props.appointment.end),
                top: getYOffset(props.appointment.start) - 1,
                left: 70,
            }}
            onClick={handleClickOpen}
        >
            <Typography variant="subtitle1"> {props.appointment.start} {props.appointment.end} </Typography>

            <AppointmentDetailsDialog open={open} onClose={handleClickClose} appointment={props.appointment} />
        </Box>
    )
}

export default AppointmentHolder;