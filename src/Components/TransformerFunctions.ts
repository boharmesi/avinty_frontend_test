import {AppointmentDetails} from "../DataSource/types";
import appointments from "../Resources/jr_resource.json";

//These functions are responsible for displaying the appointment holders on the right position.
const convertMinutesToPixels = (minutes: number) => {
    //1440 = 60 min * 24 h => there are 1440 minutes/day
    //720 = 30 px * 24 => 1-hour block height is 30 px, and there are 24 of them, so 720 is the total height of the displaying hours
    //720 / 1440 => the height of 1 minute in pixels. With multiply with the minutes we got the total height of the appointment holder
    return 720 / 1440 * minutes;
}

const convertMillisToMins = (millis: number) => {
    return millis / 1000 / 60; //convert milliseconds to min
}

export const getDuration = (start: string, end: string) => {
    let startTime = new Date(start).getTime(); //returns the start time in milliseconds
    let endTime = new Date(end).getTime(); //returns the end time in milliseconds
    //First: get the difference between start and end time
    //Second: convert milliseconds to minutes
    //Third: convert minutes to pixels
    return convertMinutesToPixels(convertMillisToMins(Math.abs(startTime - endTime)));
}

export const getYOffset = (start: string) => {
    //This function is responsible for calculating the place of the appointment holder on y-axis.
    let date = new Date(start);
    let yearTime = new Date(start.substring(0, 10).concat("T00:00:00")).getTime();
    let startTime = date.getTime() - yearTime;
    return convertMinutesToPixels(convertMillisToMins(startTime));
}

export const getColor = (color: string) => {
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

//Returns the list of the objects from the json resource file
export const readAppointments = () => {
    let tmpAppointmentList = new Array<AppointmentDetails>();
    appointments.events.map((item)  => {
        let tmp = {
            id: item.id,
            start: item.start,
            end: item.end,
            title: item.title ? item.title : "No title",
            color: item.color,
            registered: item.registered ? item.registered : false,
            location: item.location ? item.location : "No location"
        };
        tmpAppointmentList.push(tmp);
    })
    return tmpAppointmentList;
}

//This function returns the closest date to today which has at least one appointment.
export const closestDate = (appointmentsList: Array<AppointmentDetails>) => {
    const today = new Date();
    let minDifference = today.getTime() - new Date(appointmentsList[0].start).getTime() ;
    appointmentsList.map((item) => {
        const startDate = new Date(item.start).getTime();
        const difference = today.getTime() - startDate;
        if(difference < minDifference){
            minDifference = difference;
        }
    })
    return new Date(today.getTime() - minDifference);
}