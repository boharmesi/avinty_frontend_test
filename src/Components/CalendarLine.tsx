import {Divider, Grid, Typography} from "@mui/material";

type CalendarLineProps = {
    time: string
}

export const CalendarLine = (props: CalendarLineProps) => {

    return (
        <>
            <Grid item xs={2}  display="flex" justifyContent="flex-start">
                <Typography variant="subtitle1">{props.time}</Typography>
            </Grid>
            <Grid item xs={12}>
                <Divider/>
            </Grid>
        </>
    )

}


export default CalendarLine;