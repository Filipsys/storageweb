import { Container } from "@react-three/uikit";
import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";

// const ContainersDict: { [key: number]: string } = {
//     1: "red",
//     2: "blue",
//     3: "green",
//     4: "yellow",
// }

export default async function ContainersComponent() {
    const [containers, setContainers] = useState<JSX.Element[]>([]);
    const data = await fetchData();

    useEffect(() => {
        const containerElements = [];
        

        // for (let i = 1; i <= Object.keys(ContainersDict).length; i++) {
        //     containerElements.push(<Container flexGrow={1} key={i} backgroundColor={ContainersDict[i]} gap={10} positionType={"absolute"} width={100} height={100} positionTop={0 + i * 100} positionLeft={0 + i * 100} />);
        // }

        for (const element of data) {
            containerElements.push(<Container flexGrow={1} key={element.id} backgroundColor={element.color} gap={10} positionType={"absolute"} width={element.width} height={element.height} positionTop={element.y} positionLeft={element.x} />);
        }

        setContainers(containerElements);
    }, [data]);

    
    return <>{containers}</>;
}