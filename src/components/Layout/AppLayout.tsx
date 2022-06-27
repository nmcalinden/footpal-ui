import { Container, Box } from "@mui/material";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { TabContent } from "./ContentLayout";
import styled from "@emotion/styled";
import React from "react";

type AppLayoutProps = {
    children: React.ReactNode;
};

export const MainLayout = styled(Box)({
    flexGrow: 1,
    bgcolor: "background.paper",
    display: "flex",
});

export const AppLayout = ({ children }: AppLayoutProps) => {
    const [navBarOpen, setNavBarOpen] = React.useState(false);

    const isLargeScreen = useMediaQuery((theme: any) =>
        theme.breakpoints.up("md")
    );

    React.useEffect(() => {
        if (isLargeScreen) {
            setNavBarOpen(true);
        }
    }, [isLargeScreen]);

    return (
        <Container className="App" maxWidth="xl">
            <Header
                navBarOpen={navBarOpen}
                setNavBarOpen={setNavBarOpen}
                isLargeScreen={isLargeScreen}
            />
            <MainLayout>
                <NavBar setNavBarOpen={setNavBarOpen} navBarOpen={navBarOpen} />
                <TabContent children={children} setNavBarOpen={setNavBarOpen} />
            </MainLayout>
        </Container>
    );
};
