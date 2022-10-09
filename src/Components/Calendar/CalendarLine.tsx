import {Divider, Grid, Typography} from "@mui/material";

type CalendarLineProps = {
    time: string,
    yOffset: number
}

export const CalendarLine = (props: CalendarLineProps) => {

    return (
        <>
            <Grid item container position={"absolute"} top={props.yOffset * 30} display="flex" width={"100%"} height={30} padding={0} margin={0}>
                <Grid item xs={2} >
                    <Typography marginRight={"auto"} variant="subtitle1">{props.time}</Typography>
                </Grid>
                <Grid item xs={10} alignItems="center" >
                    <Divider />
                </Grid>
            </Grid>
        </>
    )

}


export default CalendarLine;