import {Button, TextField, Typography} from "@mui/material";
import {useState} from "react";
import {ApiKeyInputPageProps} from "../../DataSource/types";

export const ApiKeyInputPage = (props: ApiKeyInputPageProps) => {

    const [key, setKey] = useState("");

    const handleClick = (key: string) => {
        if (key !== "") {
            props.testApiKeyAndUpdatePages(key, true);
        }
    }

    return (
        <>
            {props.open && (
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
                    <Button style={{color: "black"}} onClick={() => {
                        handleClick(key);
                    }}>Next</Button>
                </>
            )}
        </>
    )
}

export default ApiKeyInputPage;