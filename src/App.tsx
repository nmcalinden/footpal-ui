import * as React from "react";
import { Container } from "@mui/material";
import "./App.css";
// import Header from "@/containers/header/Header";
import Navigation from "@/containers/navigation/Navigation";
import { AppProvider } from "@/providers/app";
import HeaderBar from "./containers/header/HeaderBar";

function App() {
    const children = () => {
        return (
            <Container className="App" maxWidth="xl">
                <HeaderBar />
                <Navigation />
            </Container>
        );
    };

    return <AppProvider children={children()} />;
}

export default App;
