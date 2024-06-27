import { Container } from "@react-three/uikit";
import { Html } from "@react-three/drei";
import { EditOutlined, DeleteOutlined, InsertPhotoOutlined, InsertDriveFileOutlined } from "@material-ui/icons";
import { BackHandOutlined, AdsClickOutlined } from "@mui/icons-material";
import { useEffect, useState, useCallback } from "react";


// =====/=====/=====/=====


const Navbar = () => {
    // const [hovered, setHovered] = useState<boolean>(false);
    
    return <><Container width={"100%"} height={50} positionType={"absolute"} positionTop={0} positionLeft={0} justifyContent={"center"} alignItems={"center"} marginTop={15}>
        <Container width={"auto"} justifyContent={"space-between"} alignItems={"center"} backgroundColor={"#232329"} borderRadius={10} padding={2} >
            <Container width={40} height={40} borderRadius={5} backgroundColor={"#232329"} margin={5} justifyContent={"flex-start"} alignItems={"flex-start"}>
                <Container width={20} height={20} hover={{ backgroundColor: "#31303b" }}>
                    <Html>
                        <BackHandOutlined style={{ width: "16px", AspectRatio: "1", color: "#dbd2ff" }} />
                    </Html>
                </Container>
            </Container>
            <Container width={40} height={40} borderRadius={5} backgroundColor={"#403e6a"} margin={5} justifyContent={"flex-start"} alignItems={"flex-start"}>
                <Container width={20} height={20}>
                    <Html>
                        <AdsClickOutlined style={{ width: "18px", AspectRatio: "1", color: "#dbd2ff" }} />
                    </Html>
                </Container>
            </Container>
            <Container width={40} height={40} borderRadius={5} backgroundColor={"#232329"} margin={5} justifyContent={"flex-start"} alignItems={"flex-start"}>
                <Container width={20} height={20}>
                    <Html>
                        <EditOutlined style={{ width: "18px", AspectRatio: "1", color: "#dbd2ff" }} />
                    </Html>
                </Container>
            </Container>
            <Container width={40} height={40} borderRadius={5} backgroundColor={"#232329"} margin={5} justifyContent={"flex-start"} alignItems={"flex-start"}>
                <Container width={20} height={20}>
                    <Html>
                        <DeleteOutlined style={{ width: "19px", AspectRatio: "1", color: "#dbd2ff" }} />
                    </Html>
                </Container>
            </Container>
            <Container width={40} height={40} borderRadius={5} backgroundColor={"#31303b"} margin={5} justifyContent={"flex-start"} alignItems={"flex-start"}>
                <Container width={20} height={20}>
                    <Html>
                        <InsertPhotoOutlined style={{ width: "18px", AspectRatio: "1", color: "#dbd2ff" }} />
                    </Html>
                </Container>
            </Container>
            <Container width={40} height={40} borderRadius={5} backgroundColor={"#31303b"} margin={5} justifyContent={"flex-start"} alignItems={"flex-start"}>
                <Container width={20} height={20}>
                    <Html>
                        <InsertDriveFileOutlined style={{ width: "18px", AspectRatio: "1", color: "#dbd2ff" }} />
                    </Html>
                </Container>
            </Container>
            <Container width={40} height={40} borderRadius={5} backgroundColor={"#232329"} margin={5} justifyContent={"flex-start"} alignItems={"flex-start"}>
                <Container width={20} height={20}>
                    <Html>

                    </Html>
                </Container>
            </Container>
        </Container>
    </Container></>;
}

export default Navbar;