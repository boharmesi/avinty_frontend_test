import {Divider, Grid, Typography} from "@mui/material";

type CalendarLineProps = {
    time: string
}

export const CalendarLine = (props: CalendarLineProps) => {

    return (
        <>
            <Grid borderBottom={"1px solid black"} item flexDirection={"column"} display="flex" height={30} padding={0} margin={0}>
                <Typography marginRight={"auto"} variant="subtitle1">{props.time}</Typography>
             {/*   //<Divider />*/}
            </Grid>
        </>
    )

}


export default CalendarLine;