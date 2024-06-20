import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";


export default function ElementsComponent(): JSX.Element {
    const [data, setData] = useState<JSX.Element | null>(null);

    useEffect(() => {
        fetchData().then((response) => {
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