import {Divider, Grid, Typography} from "@mui/material";
import {CalendarLineProps} from "../../DataSource/types";

export const CalendarLine = (props: CalendarLineProps) => {

    return (
        <>
            <Grid item container position={"absolute"} top={props.yOffset * 30} display="flex" width={"95%"} height={30}
                  padding={0} margin={0}>
                <Grid item xs={2}>
                    <Typography variant="subtitle1">{props.time}</Typography>
                </Grid>
                <Grid item xs={10} alignItems="center" position="relative" top={30}>
                    <Divider/>
                </Grid>
            </Grid>
        </>
    )
}

export default CalendarLine;