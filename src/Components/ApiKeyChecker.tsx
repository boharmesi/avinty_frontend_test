import {API_KEY, apiTest} from "./WeatherInformation";
import {useEffect, useState} from "react";
import MainPage from "./MainPage";
import ApiKeyInputPage from "./ApiKeyInputPage";

export const ApiKeyChecker = () => {

    const [apiKey, setApiKey] = useState<string | null>("");
    const [openMain, setOpenMain] = useState(false);
    const [openKeyInput, setOpenKeyInput] = useState(false);

    //localStorage.setItem('apiKey', "84c17deabf82d3d6f9005ed82ab47cbc");


    useEffect(() => {
            const storageKey = localStorage.getItem("apiKey");
            console.log(storageKey);
            if (storageKey) {
                const getWeatherData = async () => {
                    const response = await apiTest(storageKey);
                    console.log(response.data.weather[0].main);
                    if (response.data.weather[0].main !== undefined) {
                        setApiKey(storageKey);
                        setOpenMain(true);
                        setOpenKeyInput(false);
                    }
                }
            } else {
                setOpenMain(false);
                setOpenKeyInput(true);
                console.log("KACSA");
            }
        }, [apiKey]
    );


    return (
        <>
            <MainPage open={openMain}/>
            <ApiKeyInputPage open={!openMain}/>
        </>
    );
}

export default ApiKeyChecker;