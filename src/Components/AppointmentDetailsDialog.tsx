import {AppointmentDetails} from "../types";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";
import {format} from "date-fns";

type DialogProps = {
    open: boolean;
    onClose: () => void;
    appointment: AppointmentDetails;
}

const AppointmentDetailsDialog = (props: DialogProps) => {

    const startDate = new Date(props.appointment.start);
    //console.log(startDate);
    const endDate = new Date(props.appointment.end);

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>
                {startDate.toUTCString()} - {format(endDate, "yyyy.mm.dd. hh:MM")}
            </DialogTitle>
            <DialogActions>
                <Button onClick={props.onClose}>Close</Button>
            </DialogActions>

        </Dialog>
    )
}

export default AppointmentDetailsDialog;