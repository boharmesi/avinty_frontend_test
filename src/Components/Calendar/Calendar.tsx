import {Grid} from "@mui/material";
import CalendarLine from "../Calendar/CalendarLine";
import Appointments from "../Appointment/Appointments";
import {CalendarProps, times} from "../../DataSource/types";

export const Calendar = (props: CalendarProps) => {

    return (
        <>
            <Grid container
                  alignSelf="center"
                  maxWidth="500px"
                  border="2px solid #E38B29"
                  flexDirection={"column"}
                  height={750}
                  padding={0}
                  margin={0}
                  position="relative"
            >
                {times.map((time) => <CalendarLine yOffset={times.indexOf(time)} time={time}/>)}
                <Appointments searchDate={props.date} setClosestDate={props.setClosestDate}/>
            </Grid>
        </>
    )
}

export default Calendar;