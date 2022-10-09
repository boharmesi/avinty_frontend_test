import {AppointmentDetails} from "../../DataSource/types";
import {Box, Typography} from "@mui/material";
import AppointmentDetailsDialog from "./AppointmentDetailsDialog";
import {useState} from "react";

type AppointmentHolderProps = {
    appointment: AppointmentDetails
}

export const AppointmentHolder = (props: AppointmentHolderProps) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
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
                    width: "400px",
                    position: 'absolute',
                    height: getDuration(props.appointment.start, props.appointment.end),
                    top: getYOffset(props.appointment.start) - 1,
                    left: 90,
                }}
                onClick={handleClickOpen}
            >
                <Typography variant="subtitle1" > {props.appointment.color} </Typography>
            </Box>
            <AppointmentDetailsDialog open={open} onClose={handleClickClose} appointment={props.appointment} />
        </>
    )
}

export default AppointmentHolder;