import { Container, Text } from "@react-three/uikit";
import { useEffect, useState } from "react";

// =====/=====/=====

const AddElementButton = () => {
    const [addElementButton, setAddElementButton] = useState<JSX.Element | null>(null);

    useEffect(() => {
        setAddElementButton(
            <Container positionType={"absolute"} positionBottom={5} positionLeft={5} width={50} height={50} margin={5} backgroundColor={"#0e4145"} borderRadius={10} borderWidth={3} borderColor={"#12585d"}  onClick={() => {
                console.log("Add element button clicked");
            }} onPointerOver={() => {
                console.log("Add element button hovered");
            }} onPointerOut={() => {
                console.log("Add element button unhovered");
            }}>
                <Text fontSize={40} color={"#dbd2ff"} width={50} textAlign={"center"} verticalAlign={"middle"}>+</Text>
            </Container>
        );
    }, []);

    return <>{addElementButton}</>;
}

export default AddElementButton;