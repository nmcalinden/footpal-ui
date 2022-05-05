import "./App.css";
import { AppProvider } from "@/providers/app";
import { AppRoutes } from "./routes";

function App() {
    return <AppProvider children={<AppRoutes />} />;
}

export default App;
