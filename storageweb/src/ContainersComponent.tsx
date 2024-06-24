import { Container, Text } from "@react-three/uikit";
import { useEffect, useState, useCallback } from "react";
import { Html } from "@react-three/drei";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import { useFrame } from "@react-three/fiber";

interface ContainersComponentProps {
    data: {
        [x: string]: any;
    };
}

const ContainersComponent: React.FC<ContainersComponentProps> = ({ data }) => {
    const [containers, setContainers] = useState<JSX.Element[]>([]);
    const [dragged, setDragged] = useState<null | number>(null);
    const [positions, setPositions] = useState(data["data"].map((element: any) => ({ id: element.id, x: element.x, y: element.y })));

    data = data["data"];

    const handleDragStart = useCallback((id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setDragged(id);
    }, []);

    const handleDrag = useCallback((e: MouseEvent) => {
        if (dragged !== null) {
            setPositions((prev: { id: number, x: number, y: number }[]) => prev.map((pos: { id: number, x: number, y: number }) => pos.id === dragged ? { ...pos, x: e.clientX, y: e.clientY } : pos));
        }
    }, [dragged]);

    const handleDragEnd = useCallback(() => {
        setDragged(null);

        // send data to server
    }, []);
    
    useEffect(() => {
        window.addEventListener("mousemove", handleDrag);
        window.addEventListener("mouseup", handleDragEnd);

        return () => {
            window.removeEventListener("mousemove", handleDrag);
            window.removeEventListener("mouseup", handleDragEnd);
        };
    }, [handleDrag, handleDragEnd]);

    useEffect(() => {
        if (data.length > 0) {
            const newContainers = data.map((element: any) => {
                const position = positions.find(pos => pos.id === element.id);
                
                return (
                    <Container
                        key={element.id}
                        borderRadius={10}
                        padding={10}
                        borderWidth={3}
                        borderColor={element.color}
                        backgroundColor={"#197278"}
                        positionType={"absolute"}
                        width={element.width}
                        height={element.height}
                        positionTop={position?.y || element.y}
                        positionLeft={position?.x || element.x}
                    >
                        <Text fontSize={20} color={element.color} verticalAlign="top">{element.data}</Text>

                        <Container
                            positionType={"absolute"}
                            positionBottom={10}
                            positionRight={10}
                            width={10}
                            height={10}
                            margin={10}
                        >
                            <Html>
                                <div
                                    style={{ cursor: "sw-resize" }}
                                    onMouseDown={(e) => handleDragStart(element.id, e)}
                                >
                                    <DragIndicatorRoundedIcon />
                                </div>
                            </Html>
                        </Container>
                    </Container>
                );
            });

            setContainers(newContainers);
        }
    }, [data, positions, handleDragStart]);

    return <>{containers}</>;
};

export default ContainersComponent;
