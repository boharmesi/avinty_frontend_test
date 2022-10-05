import {Grid, IconButton, TextField} from "@mui/material";
import {useState} from "react";
import {DatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider"
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Calendar from "./Calendar";
import Appointments from "./Appointments";


export const MainPage = () => {
    const [date, setDate] = useState<Date | null>(new Date());

    const getPreviousDay = (date: Date) => {
        const previousDate = new Date(date.getTime());
        previousDate.setDate(date.getDate() - 1);
        return previousDate;
    }

    const getNextDay = (date: Date) => {
        const nextDate = new Date(date.getTime());
        nextDate.setDate(date.getDate() + 1);
        return nextDate;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid container alignItems="center"
                  justifyContent="center">
                <Grid item>
                    <IconButton
                        onClick={() => {
                            if (date !== null) {
                                setDate(getPreviousDay(date));
                            }
                        }}>
                        <NavigateBeforeIcon fontSize="large"/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <DatePicker
                        value={date}
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item>
                    <IconButton
                        onClick={() => {
                            if (date !== null) {
                                setDate(getNextDay(date));
                            }
                        }}>
                        <NavigateNextIcon fontSize="large"/>
                    </IconButton>
                </Grid>
            </Grid>
            <Calendar date={date}/>
        </LocalizationProvider>
    )
}

export default MainPage;