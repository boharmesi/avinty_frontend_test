import {Grid, IconButton, TextField} from "@mui/material";
import {useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider"
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Calendar from "./Calendar";

type MainPageProps = {
    open: boolean,
}

export const CalendarFrame = (props: MainPageProps) => {
    const [date, setDate] = useState<Date | null>(new Date());


    const getPreviousDay = (date: Date) => {
        const previousDate = new Date(date.getTime());
        previousDate.setDate(date.getDate() - 1);
        setDate(previousDate);
    }

    const getNextDay = (date: Date) => {
        const nextDate = new Date(date.getTime());
        nextDate.setDate(date.getDate() + 1);
        setDate(nextDate);
    }

    const setClosestDate = (date: Date) => {
        setDate(date);
    }

    return (
        <>
            {props.open && (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Grid container alignItems="center"
                          justifyContent="center"
                          marginBottom="20px">
                        <Grid item>
                            <IconButton
                                onClick={() => {
                                    if (date !== null) {
                                        getPreviousDay(date);
                                    }
                                }}>
                                <NavigateBeforeIcon fontSize="large"/>
                            </IconButton>
                        </Grid>
                        <Grid item >
                            <DatePicker
                                value={date}
                                onChange={(newDate) => {
                                    if (newDate !== null) {
                                        setDate(new Date(newDate.toString()));
                                    }
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Grid>
                        <Grid item>
                            <IconButton
                                onClick={() => {
                                    if (date !== null) {
                                        getNextDay(date);
                                    }
                                }}>
                                <NavigateNextIcon fontSize="large"/>
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Calendar date={date} setClosestDate={setClosestDate}/>
                </LocalizationProvider>
            )}
        </>
    )
}

export default CalendarFrame;