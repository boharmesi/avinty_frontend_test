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
}