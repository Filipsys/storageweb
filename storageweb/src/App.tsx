import { StrictMode } from "react";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import ContainersComponent from "./components/ContainersComponent";

import "./index.css";
import "./App.css";

// =====/=====/=====


// eslint-disable-next-line react-refresh/only-export-components, @typescript-eslint/no-explicit-any
const App = (data: any) => {
    return (
        <StrictMode>
            {/* <Canvas style={{ backgroundColor: "#161718" }}>
                <Fullscreen flexDirection="row" gap={10} positionType={"relative"}>
                    <AddElementButton />
                    <Navbar />

                    
                    
                </Fullscreen>
            </Canvas> */}

            <Navbar />

            <ContainersComponent data={data} />

            <Grid />
        </StrictMode>
    );
};

export default App;