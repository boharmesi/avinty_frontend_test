import {AppointmentDetails} from "../../DataSource/types";
import appointments from '../../Resources/jr_resource.json';
import AppointmentHolder from "../Appointment/AppointmentHolder";
import {useEffect} from "react";

type AppointmentsProps = {
    searchDate : Date | null,
    setClosestDate: (date: Date) => void
}

export const Appointments = (props: AppointmentsProps) => {

    const readAppointments = () => {
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

    let appointmentsList = readAppointments();

    const closestDate = () => {
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

    useEffect(() =>{
        props.setClosestDate(closestDate());
    }, [])

    return (
        <div>
            {appointmentsList.map((item) =>
                props.searchDate?.toISOString().substring(0,10) === item.start.substring(0,10) ? <AppointmentHolder appointment={item} /> : null)
            }
        </div>
    )
}

export default Appointments;