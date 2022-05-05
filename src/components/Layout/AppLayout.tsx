import { Container, Box } from "@mui/material";
import { Header } from "@/components/Header";
import { NavBar } from "@/components/NavBar";
import { TabContent } from "./ContentLayout";
import styled from "@emotion/styled";

type AppLayoutProps = {
    children: React.ReactNode;
};

export const MainLayout = styled(Box)({
    width: "100%",
    flexGrow: 1,
    bgcolor: "background.paper",
    display: "flex",
    height: "100%",
});

export const AppLayout = ({ children }: AppLayoutProps) => {
    return (
        <Container className="App" maxWidth="xl">
            <Header />
            <MainLayout>
                <NavBar />
                <TabContent children={children} />
            </MainLayout>
        </Container>
    );
};
