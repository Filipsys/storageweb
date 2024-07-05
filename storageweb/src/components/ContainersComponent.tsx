import { useEffect, useState, useCallback } from "react";
import { DragIndicatorRounded } from "@mui/icons-material";
import "./css/elements.css";


// =====/=====/=====/=====


interface ContainersComponentProps {
    data: {
        [x: string]: any;
    };
}


// =====/=====/=====/=====


const ContainersComponent: React.FC<ContainersComponentProps> = ({ data }) => {
    const [containers, setContainers] = useState<JSX.Element[]>([]);
    // const [positions, setPositions] = useState(data["data"].map((element: any) => ({ id: element.id, x: element.x, y: element.y, width: element.width, height: element.height })));
    // const [dragged, setDragged] = useState<null | { id: number, offsetX: number, offsetY: number }>(null);
    // const [lastSetPos, setLastSetPos] = useState<null | { id: number, x: number, y: number }>(null);
    // const [canvasMoved, setCanvasMoved] = useState<null | [false, { x: number, y: number }]>(null);

    data = data["data"];

    // const handleDragStart = useCallback((id: number, e: ThreeEvent<PointerEvent>) => {
    //     e.stopPropagation();

    //     const position = positions.find(pos => pos.id === id);
    //     if (position) {
    //         const offsetX = e.clientX - position.x;
    //         const offsetY = e.clientY - position.y;
    //         setDragged({ id, offsetX, offsetY });
    //     }
    // }, [positions]);

    // const handleDrag = useCallback((e: PointerEvent) => {
    //     if (dragged !== null) {
    //         setPositions(prev => prev.map(pos =>
    //             pos.id === dragged.id ? { ...pos, x: e.clientX - dragged.offsetX, y: e.clientY - dragged.offsetY } : pos
    //         ));

    //         setLastSetPos({ id: dragged.id, x: e.clientX - dragged.offsetX, y: e.clientY - dragged.offsetY });
    //     }
    // }, [dragged]);

    // const handleDragEnd = useCallback(() => {
    //     setDragged(null);

    //     // send data to server
    //     fetch("http://localhost:3000/api/savePosition", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             id: lastSetPos?.id,
    //             x: lastSetPos?.x,
    //             y: lastSetPos?.y,
    //         }),
    //     });

    //     setLastSetPos(null);
    // }, [lastSetPos]);


    // =====/=====/=====/=====


    // useEffect(() => {
    //     window.addEventListener("pointermove", handleDrag);
    //     window.addEventListener("pointerup", handleDragEnd);

    //     return () => {
    //         window.removeEventListener("pointermove", handleDrag);
    //         window.removeEventListener("pointerup", handleDragEnd);
    //     };
    // }, [handleDrag, handleDragEnd]);


    useEffect(() => {
        if (data.length > 0) {
            const newContainers = data.map((element: any) => {
                return (
                    <div className="container-element"
                        style={{
                            width: element.width,
                            height: element.height,
                            top: element.y,
                            left: element.x
                        }}>
                        <div className="container-element-text">
                            {element.data}
                        </div>

                        <div className="container-element-drag-icon">
                            <DragIndicatorRounded />
                        </div>
                    </div>
                );
            });

            setContainers(newContainers);
        }
    }, [data]);

    return <>{containers}</>;
};

export default ContainersComponent;
