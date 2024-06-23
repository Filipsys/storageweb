import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { fetchData } from "./fetchData";
import App from "./App";

// =====/=====/=====

createRoot(document.getElementById('root') as HTMLCanvasElement).render(
    <StrictMode>
        <App data={ await fetchData() } />
    </StrictMode>,
);