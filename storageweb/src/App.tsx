import { StrictMode } from "react";
import { Canvas } from "@react-three/fiber";
import { Fullscreen, Svg } from "@react-three/uikit";
import AddElementButton from "./components/AddElementButton";
import ContainersComponent from "./components/ContainersComponent";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";

import "./index.css";
import "./App.css";

// =====/=====/=====


// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
const App = (data: any) => {
    return (
        <StrictMode>
            <Canvas style={{ backgroundColor: "#161718" }}>
                <Fullscreen flexDirection="row" gap={10} positionType={"relative"}>
                    <Grid />
                    {/* <AddElementButton /> */}
                    <Navbar />

                    <ContainersComponent data={data} />
                </Fullscreen>
            </Canvas>
        </StrictMode>
    );
};

export default App;