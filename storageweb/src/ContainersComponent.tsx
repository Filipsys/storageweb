import { Container } from "@react-three/uikit";
import { SetStateAction, useEffect, useState } from "react";
import { fetchData } from "./fetchData";

// =====|=====|=====

let data: Array<unknown> = [];
async function fetchDataAsync() {
    data = await fetchData();
}

fetchDataAsync();

// =====|=====|=====

export default function ContainersComponent() {
    const [containers, setContainers] = useState<JSX.Element[]>([]);

    console.log(data);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.forEach((element: any) => {
            setContainers((prevContainers: JSX.Element[]) => {
                return [...prevContainers, <Container key={element.id} borderRadius={10} padding={10} borderWidth={3} borderColor={element.color} backgroundColor={"#197278"} gap={10} positionType={"absolute"} width={element.width} height={element.height} positionTop={element.y} positionLeft={element.x}></Container>];
            });
        });
    }, []);

    return <>{containers}</>;
}