import React from 'react';
import './App.css';
import {QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ApiKeyChecker from "./Components/Openweather/ApiKeyChecker";

function App() {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <header className="App-header">
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<ApiKeyChecker/>} />
                        </Routes>
                    </BrowserRouter>
                </header>
            </div>
        </QueryClientProvider>
    );
}

export default App;
