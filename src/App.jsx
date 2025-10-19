import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllNotes from "./components/AllNotes";

function App() {

    const [lightMode, setLightMode] = useState(false)

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home lightMode={lightMode} setLightMode={setLightMode} />} />
                    <Route path="/all-notes" element={<AllNotes lightMode={lightMode} setLightMode={setLightMode} />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
