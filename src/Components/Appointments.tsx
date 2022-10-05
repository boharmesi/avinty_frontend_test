import {AppointmentDetails} from "../types";
import appointments from '../jr_resource.json';
import AppointmentHolder from "./AppointmentHolder";

type AppointmentsProps = {
    searchDate : Date | null,
}

export const Appointments = (props: AppointmentsProps) => {

    const readAppointments = () => {
        let tmpAppointmentList = new Array<AppointmentDetails>();
        appointments.events.map((item) => {
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

    return (
        <div>
            {appointmentsList.map((item) =>
                props.searchDate?.toISOString().substring(0,10) === item.start.substring(0,10) ? <AppointmentHolder appointment={item} /> : null)
            }
        </div>
    )
}

export default Appointments;