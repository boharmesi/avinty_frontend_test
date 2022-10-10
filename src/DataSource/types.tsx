export type AppointmentDetails = {
    id: number,
    start: string,
    end: string,
    title: string,
    color: string,
    registered: boolean,
    location: string
}

export type WeatherData = {
    weather: string;
    temp: number;
    iconUrl: string;
    city: string
}

export type DialogProps = {
    open: boolean,
    onClose: () => void,
    appointment: AppointmentDetails,
    latitude: number,
    longitude: number,
    weather: WeatherData,
}

export type AppointmentHolderProps = {
    appointment: AppointmentDetails,
    longitude: number,
    latitude: number
}

export type AppointmentsProps = {
    searchDate : Date | null,
    setClosestDate: (date: Date) => void
}

export type CalendarProps = {
    date: Date | null
    setClosestDate: (date: Date) => void;
}

export type CalendarLineProps = {
    time: string,
    yOffset: number
}

export type ApiKeyInputPageProps = {
    open: boolean,
    testApiKeyAndUpdatePages(key: string, shouldUpdateStorage: boolean): void;
}

export const times = ["0:00", "1:00", "2:00", "3:00", "4:00", "5:00", "6:00", "7:00", "8:00", "9:00", "10:00",
    "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
    "21:00", "22:00", "23:00"
]