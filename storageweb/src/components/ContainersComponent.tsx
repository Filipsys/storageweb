import { Container, Text } from "@react-three/uikit";
import { useEffect, useState, useCallback } from "react";
import { Html } from "@react-three/drei";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import { ThreeEvent } from "@react-three/fiber";


// =====/=====/=====/=====


interface ContainersComponentProps {
    data: {
        [x: string]: any;
    };
}


// =====/=====/=====/=====


const ContainersComponent: React.FC<ContainersComponentProps> = ({ data }) => {
    const [containers, setContainers] = useState<JSX.Element[]>([]);
    const [dragged, setDragged] = useState<null | { id: number, offsetX: number, offsetY: number }>(null);
    const [lastSetPos, setLastSetPos] = useState<null | { id: number, x: number, y: number }>(null);
    // const [canvasMoved, setCanvasMoved] = useState<null | [false, { x: number, y: number }]>(null);
    const [positions, setPositions] = useState(data["data"].map((element: any) => ({ id: element.id, x: element.x, y: element.y, width: element.width, height: element.height })));

    data = data["data"];

    const handleDragStart = useCallback((id: number, e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();

        const position = positions.find(pos => pos.id === id);
        if (position) {
            const offsetX = e.clientX - position.x;
            const offsetY = e.clientY - position.y;
            setDragged({ id, offsetX, offsetY });
        }
    }, [positions]);

    const handleDrag = useCallback((e: PointerEvent) => {
        if (dragged !== null) {
            setPositions(prev => prev.map(pos =>
                pos.id === dragged.id ? { ...pos, x: e.clientX - dragged.offsetX, y: e.clientY - dragged.offsetY } : pos
            ));

            setLastSetPos({ id: dragged.id, x: e.clientX - dragged.offsetX, y: e.clientY - dragged.offsetY });
        }
    }, [dragged]);

    const handleDragEnd = useCallback(() => {
        setDragged(null);

        // send data to server
        fetch("http://localhost:3000/api/savePosition", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: lastSetPos?.id,
                x: lastSetPos?.x,
                y: lastSetPos?.y,
            }),
        });

        setLastSetPos(null);
    }, [lastSetPos]);


    // =====/=====/=====/=====


    useEffect(() => {
        window.addEventListener("pointermove", handleDrag);
        window.addEventListener("pointerup", handleDragEnd);

        return () => {
            window.removeEventListener("pointermove", handleDrag);
            window.removeEventListener("pointerup", handleDragEnd);
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
                        borderColor={"#12585d"}
                        backgroundColor={"#0e4145"}
                        positionType={"absolute"}
                        width={element.width}
                        height={element.height}
                        positionTop={position?.y || element.y}
                        positionLeft={position?.x || element.x}
                        onPointerDown={(e) => handleDragStart(element.id, e)}
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
                                <div style={{ cursor: "move" }}>
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
