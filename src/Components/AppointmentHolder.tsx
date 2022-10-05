import {AppointmentDetails} from "../types";
import {Box, Typography} from "@mui/material";

type AppointmentHolderProps = {
    appointment: AppointmentDetails
}

export const AppointmentHolder = (props: AppointmentHolderProps) => {

    const DIVIDER_HEIGHT = 1;

    const convertMinutesToPixels = (minutes: number) => {
        return 720/1440 * minutes;
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
        let yearTime = new Date(start.substring(0,10).concat("T00:00:00")).getTime();
        let startTime = date.getTime() - yearTime;

        console.log(startTime);
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
        >
            <Typography variant="subtitle1"> {props.appointment.start} {props.appointment.end} </Typography>
        </Box>
    )
}

export default AppointmentHolder;