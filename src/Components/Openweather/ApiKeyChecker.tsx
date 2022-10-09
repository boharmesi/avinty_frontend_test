import {apiTest, setApiKey} from "./OpenweatherApiInformation";
import {useEffect, useState} from "react";
import CalendarFrame from "../Calendar/CalendarFrame";
import ApiKeyInputPage from "./ApiKeyInputPage";

export const ApiKeyChecker = () => {

    const [openMain, setOpenMain] = useState(false);
    const [openKeyInput, setOpenKeyInput] = useState(false);

    const testApiKeyAndUpdatePages = (storageKey: string, shouldUpdateStorage: boolean) => {
        apiTest(storageKey).then(response => {
            if (response.data.weather[0].main !== undefined) {
                setApiKey(storageKey);
                setOpenMain(true);
                setOpenKeyInput(false);
                if(shouldUpdateStorage){
                    localStorage.setItem('apiKey', storageKey);
                }
            }
        })
    }

    useEffect(() => {
            const storageKey = localStorage.getItem("apiKey");
            if (storageKey) {
                testApiKeyAndUpdatePages(storageKey, false);
            }else {
                setOpenKeyInput(true);
                setOpenMain(false);
            }
        }, []
    );


    return (
        <>
            <CalendarFrame open={openMain}/>
            <ApiKeyInputPage open={openKeyInput} testApiKeyAndUpdatePages={testApiKeyAndUpdatePages}/>
        </>
    );
}

export default ApiKeyChecker;