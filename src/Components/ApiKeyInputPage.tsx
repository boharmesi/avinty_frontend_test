import {Button, TextField, Typography} from "@mui/material";
import {useState} from "react";

type ApiKeyInputPageProps = {
    open: boolean
}

export const ApiKeyInputPage = (props: ApiKeyInputPageProps) => {

    const [key, setKey] = useState("");

    return (
        <>
            {props.open !== true ? null : (
                <>
                    <Typography>Please add your OpenWeather API key to weather information.</Typography>
                    <TextField
                        required={true}
                        id="apikey"
                        label="Openweather API key"
                        defaultValue={key}
                        onChange={(e) => {
                            setKey(e.target.value);
                        }}
                    />
                    <Button>Next</Button>
                </>
            )}
        </>
    )
}

export default ApiKeyInputPage;