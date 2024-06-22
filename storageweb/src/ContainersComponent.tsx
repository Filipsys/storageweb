import { Container, Text } from "@react-three/uikit";
import { useEffect, useState } from "react";
import { Html } from "@react-three/drei"
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";


// =====/=====/=====


let resizing = false;


interface ContainersComponentProps {
    data: {
        [x: string]: any;
    };
}

function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
    resizing = true;

    if (resizing) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        // Get the main container (two levels up from the resize handle)
        const mainContainer = event.currentTarget.parentElement?.parentElement?.parentElement;

        if (mainContainer) {
            // Get the bounding rectangle of the main container
            const rect = mainContainer.getBoundingClientRect();

            // Get the x and y position of the main container
            const containerX = rect.left;
            const containerY = rect.top;

            // Get the current width and height of the main container
            const containerWidth = rect.width;
            const containerHeight = rect.height;

            console.log('Container X:', containerX);
            console.log('Container Y:', containerY);
            console.log('Container Width:', containerWidth);
            console.log('Container Height:', containerHeight);

            // Calculate the new width and height
            const newWidth = containerWidth + (mouseX - (containerX + containerWidth));
            const newHeight = containerHeight + (mouseY - (containerY + containerHeight));

            // Set the new width and height of the main container
            mainContainer.style.width = `${newWidth}px`;
            mainContainer.style.height = `${newHeight}px`;
        }
    }
}

function handleMouseUp(event: React.MouseEvent<HTMLDivElement>) {
    resizing = false;
}

const ContainersComponent: React.FC<ContainersComponentProps> = ({ data }) => {
    const [containers, setContainers] = useState<JSX.Element[]>([]);
    data = data["data"];

    useEffect(() => {
        if (data.length > 0) {
            const newContainers = data.map((element: any) => (
                <Container key={element.id} borderRadius={10} padding={10} borderWidth={3} borderColor={element.color} backgroundColor={"#197278"} positionType={"absolute"} width={element.width} height={element.height} positionTop={element.y} positionLeft={element.x}>
                    <Text fontSize={20} color={element.color} verticalAlign="top">{element.data}</Text>

                    <Container positionType={"absolute"} positionBottom={10} positionRight={10} width={10} height={10} margin={10}>
                        <Html>
                            <div style={{ "cursor": "sw-resize" }} onPointerDown={handleMouseDown} onPointerUp={handleMouseUp}>
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