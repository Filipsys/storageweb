import { StrictMode } from "react";
import { Canvas } from "@react-three/fiber";
import { Fullscreen } from "@react-three/uikit";
import AddElementButton from "./AddElementButton";
import ContainersComponent from "./ContainersComponent";

import "./index.css";
import "./App.css";

// =====/=====/=====


// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
const App = (data: any) => {
    return (
        <StrictMode>
            <Canvas style={{ backgroundColor: "#1e2e3b" }}>
                <Fullscreen flexDirection="row" gap={10} positionType={"relative"}>
                    <AddElementButton />

                    <ContainersComponent data={data} />
                </Fullscreen>
            </Canvas>
        </StrictMode>
    );
};

export default App;