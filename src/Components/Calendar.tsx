import {Grid} from "@mui/material";
import CalendarLine from "./CalendarLine";
import Appointments from "./Appointments";

type CalendarProps = {
    date: Date | null
}

export const Calendar = (props: CalendarProps) => {

    const times = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00",
        "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
        "21:00", "22:00", "23:00", "24:00"
    ]

    return (
        <>
            <Grid container
                  alignSelf="center"
                  maxWidth="500px"
                  border="1px solid #E38B29"
                  // padding="10px"
                  // marginTop="20px"
                  flexDirection={"column"}
                  height={750}
                  padding={0}
                  margin={0}
                  position="relative"
            >
                {times.map((time) => <CalendarLine yOffset={times.indexOf(time)} time={time}/>)}

                <Appointments searchDate={props.date}/>
            </Grid>
        </>
    )
}

export default Calendar;