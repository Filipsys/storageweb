import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Fullscreen, Container } from "@react-three/uikit";
import "./App.css";
import "./index.css";


async function fetchData() {
    const response = await fetch("http://127.0.0.1:3000/api/data", { method: "GET", headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET" } });

    return await response.json();
}

// eslint-disable-next-line react-refresh/only-export-components
function MyComponent(): JSX.Element {
    const [data, setData] = useState<JSX.Element | null>(null);

    useEffect(() => {
        fetchData().then((response) => {
            // setData(<p>{response}</p>);

            setData(response.map((element: Element) => (
                <div className={`${element.id} note-element`} key={element.id} style={{ position: "absolute", left: element.x, top: element.y, width: element.width, height: element.height, backgroundColor: element.color, border: `3px solid ${element.color}` }}>
                    {element.dataType === "text" ? <p>{element.data}</p> : null}
                </div>
            )));

            interface Element {
                id: number;
                x: number;
                y: number;
                width: number;
                height: number;
                color: string;
                dataType: string;
                data: string;
            }
        });
    }, []);

    return <>{data}</>;
}


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Fullscreen>
            <MyComponent />
        </Fullscreen>
    </StrictMode>
);
