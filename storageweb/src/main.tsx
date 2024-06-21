import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Fullscreen, Container } from "@react-three/uikit";
import ContainersComponent from "./ContainersComponent";

import "./index.css";
import "./App.css";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Canvas style={{ backgroundColor: "#1e2e3b" }}>
            <Fullscreen flexDirection="row" gap={10}>
                <ContainersComponent />
            </Fullscreen>
        </Canvas>
    </StrictMode>
);
