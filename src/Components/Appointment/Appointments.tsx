import {AppointmentsProps} from "../../DataSource/types";
import AppointmentHolder from "../Appointment/AppointmentHolder";
import {useEffect, useState} from "react";
import {closestDate, readAppointments} from "../TransformerFunctions";

export const Appointments = (props: AppointmentsProps) => {

    const [longitude, setLongitude] = useState<number>(0);
    const [latitude, setLatitude] = useState<number>(0);

    const appointmentsList = readAppointments();

    useEffect(() => {
        props.setClosestDate(closestDate(appointmentsList));
        navigator.geolocation.getCurrentPosition(function (position) {
            setLongitude(position.coords.longitude);
            setLatitude(position.coords.latitude);
        })
    }, [])

    return (
        <div>
            {appointmentsList.map((item) =>
                props.searchDate?.toISOString().substring(0, 10) === item.start.substring(0, 10) ?
                    <AppointmentHolder appointment={item} longitude={longitude} latitude={latitude}/> : null)
            }
        </div>
    )
}

export default Appointments;