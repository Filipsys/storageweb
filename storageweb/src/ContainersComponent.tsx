import { Container, Text } from "@react-three/uikit";
import { useEffect, useState } from "react";
import { fetchData } from "./fetchData";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import { Html } from "@react-three/drei"


// =====/=====/=====


interface ContainersComponentProps {
    data: Array<unknown>;
}

const ContainersComponent: React.FC<ContainersComponentProps> = ({ data }) => {
    // const [data, setData] = useState<Array<unknown>>([]);
    const [containers, setContainers] = useState<JSX.Element[]>([]);

    // useEffect(() => {
    //     async function fetchDataAsync() {
    //         const fetchedData = await fetchData();
    //         setData(fetchedData);
    //     }

    //     fetchDataAsync();
    // }, []);

    console.log(data);
    

    useEffect(() => {
        if (data.length > 0) {
            const newContainers = data.map((element: any) => (
                <Container key={element.id} borderRadius={10} padding={10} borderWidth={3} borderColor={element.color} backgroundColor={"#197278"} positionType={"absolute"} width={element.width} height={element.height} positionTop={element.y} positionLeft={element.x}>
                    <Text fontSize={20} color={element.color} verticalAlign="top">{element.data}</Text>

                    <Container positionType={"absolute"} positionBottom={10} positionRight={10} width={10} height={10} margin={10}>
                        <Html>
                            <div style={{"cursor": "sw-resize"}} onPointerDown={() => console.log('down')} onPointerUp={() => console.log('up')}>
                                <DragIndicatorRoundedIcon />
                            </div>
                        </Html>
                    </Container>
                </Container>
            ));
            
            setContainers(newContainers);
        }
    }, [data]);

    return <>{containers}</>;
}

export default ContainersComponent;