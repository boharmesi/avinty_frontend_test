import {AppointmentDetails} from "../types";
import {Box, Typography} from "@mui/material";

type AppointmentHolderProps = {
    appointment: AppointmentDetails
}

export const AppointmentHolder = (props: AppointmentHolderProps) => {

    const duration = (start: string, end: string) => {
        let startTime = new Date(start).getTime();
        let endTime = new Date(end).getTime();
        return Math.abs((startTime - endTime) / 1000 / 60 / 60); //convert milliseconds to hours
    }

    duration(props.appointment.start, props.appointment.end)

    return (
        <Box display="flex"
             style={{background: "#F1A661", border: "1px solid black", borderRadius: "5px", maxWidth: "500px"}}
        >
            <Typography variant="subtitle1">{props.appointment.start} </Typography>
        </Box>
    )
}

export default AppointmentHolder;