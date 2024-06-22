import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Fullscreen, Container } from "@react-three/uikit";
import ContainersComponent from "./ContainersComponent";
import { fetchData } from "./fetchData";

import "./index.css";
import "./App.css";


// =====/=====/=====


// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
const App = (data: any) => {
    return (
        <StrictMode>
            <Canvas style={{ backgroundColor: "#1e2e3b" }}>
                <Fullscreen flexDirection="row" gap={10}>
                    <ContainersComponent data={data} />
                </Fullscreen>
            </Canvas>
        </StrictMode>
    );
};

createRoot(document.getElementById("root")!).render(<App data={ await fetchData() } />);
