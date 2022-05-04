import * as React from "react";
import { Container } from "@mui/material";
import "./App.css";
import Header from "@/containers/header/Header";
import Navigation from "@/containers/navigation/Navigation";
import { AppProvider } from "@/providers/app";

function App() {
    const children = () => {
        return (
            <Container className="App" maxWidth="xl">
                <Header />
                <Navigation />
            </Container>
        );
    };

    return <AppProvider children={children()} />;
}

export default App;
