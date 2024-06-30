import { Container, Svg, Text } from "@react-three/uikit";
// import { Html } from "@react-three/drei";
// import { EditOutlined, DeleteOutlined, InsertPhotoOutlined, InsertDriveFileOutlined } from "@material-ui/icons";
// import { BackHandOutlined, AdsClickOutlined } from "@mui/icons-material";
// import { useState, useCallback } from "react";


// =====/=====/=====/=====


const Navbar = () => {
    return (
        <Container width={"100%"} height={50} positionType={"absolute"} positionTop={0} positionLeft={0} justifyContent={"center"} alignItems={"center"} marginTop={15}>
            <Container width={"auto"} justifyContent={"space-around"} alignItems={"center"} backgroundColor={"#232329"} borderRadius={10} padding={2} borderTopRightRadius={0} borderBottomRightRadius={0}>
                <Container width={40} height={40} borderRadius={5} backgroundOpacity={0.5} backgroundColor={"#232329"} margin={5} justifyContent={"center"} alignItems={"center"} hover={{ backgroundColor: "#31303b" }}>
                    <Container width={16} height={16}>
                        <Svg width={20} opacity={0.5} height={20}
                            src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/back_hand/materialsymbolsoutlined/back_hand_20px.svg"
                            color={"white"} />
                    </Container>
                </Container>
                <Container width={40} height={40} borderRadius={5} backgroundOpacity={0.5} backgroundColor={"#232329"} margin={5} justifyContent={"center"} alignItems={"center"} hover={{ backgroundColor: "#31303b" }}>
                    <Container width={16} height={16}>
                        <Svg width={20} opacity={0.5} height={20}
                            src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/edit/materialsymbolsoutlined/edit_wght500_20px.svg"
                            color={"white"} />
                    </Container>
                </Container>
                <Container width={40} height={40} borderRadius={5} backgroundOpacity={0.5} backgroundColor={"#232329"} margin={5} justifyContent={"center"} alignItems={"center"} hover={{ backgroundColor: "#31303b" }}>
                    <Container width={16} height={16}>
                        <Svg width={20} opacity={0.5} height={20}
                            src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/delete/materialsymbolsoutlined/delete_wght500_20px.svg"
                            color={"white"} />
                    </Container>
                </Container>
                <Container width={40} height={40} borderRadius={5} backgroundOpacity={0.5} backgroundColor={"#232329"} margin={5} justifyContent={"center"} alignItems={"center"} hover={{ backgroundColor: "#31303b" }}>
                    <Container width={16} height={16}>
                        <Svg width={20} opacity={0.5} height={20}
                            src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/delete/materialsymbolsoutlined/delete_wght500_20px.svg"
                            color={"white"} />
                    </Container>
                </Container>
                <Container width={40} height={40} borderRadius={5} backgroundOpacity={0.5} backgroundColor={"#232329"} margin={5} justifyContent={"center"} alignItems={"center"} hover={{ backgroundColor: "#31303b" }}>
                    <Container width={16} height={16}>
                        <Svg width={20} opacity={0.5} height={20}
                            src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/delete/materialsymbolsoutlined/delete_wght500_20px.svg"
                            color={"white"} />
                    </Container>
                </Container>
                <Container width={40} height={40} borderRadius={5} backgroundOpacity={0.5} backgroundColor={"#232329"} margin={5} justifyContent={"center"} alignItems={"center"} hover={{ backgroundColor: "#31303b" }}>
                    <Container width={16} height={16}>
                        <Svg width={20} opacity={0.5} height={20}
                            src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/delete/materialsymbolsoutlined/delete_wght500_20px.svg"
                            color={"white"} />
                    </Container>
                </Container>
            </Container>

            <Container width={"auto"} justifyContent={"space-around"} alignItems={"center"} backgroundColor={"#2e2e36"} borderRadius={10} borderTopLeftRadius={0} borderBottomLeftRadius={0} padding={2}>
                <Container width={20} height={40} borderRadius={5} backgroundOpacity={0.5} margin={5} justifyContent={"center"} alignItems={"center"}>
                    <Text opacity={0.3} fontSize={24} color={"white"} width={20} textAlign={"center"} verticalAlign={"middle"}>+</Text>
                </Container>

                <Container width={40} height={40} borderRadius={5} backgroundOpacity={0.5} backgroundColor={"#232329"} margin={5} justifyContent={"center"} alignItems={"center"} hover={{ backgroundColor: "#1d1d22" }}>
                    <Container width={19} height={19} justifyContent={"center"} alignItems={"center"} transformRotateZ={45}>
                        <Svg opacity={0.5} width={20} height={20}
                            src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/link/materialsymbolsoutlined/link_20px.svg"
                            color={"white"} />
                    </Container>
                </Container>

                <Container width={40} height={40} borderRadius={5} backgroundOpacity={0.5} backgroundColor={"#232329"} margin={5} justifyContent={"center"} alignItems={"center"} hover={{ backgroundColor: "#1d1d22" }}>
                    <Container width={16} height={16}>
                        <Svg opacity={0.5} width={20} height={20}
                            src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/photo/materialsymbolsoutlined/photo_20px.svg"
                            color={"white"} />
                    </Container>
                </Container>

                <Container width={40} height={40} borderRadius={5} backgroundOpacity={0.5} backgroundColor={"#232329"} margin={5} justifyContent={"center"} alignItems={"center"} hover={{ backgroundColor: "#1d1d22" }}>
                    <Container width={16} height={16}>
                        <Svg opacity={0.5} width={20} height={20}
                            src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/article/materialsymbolsoutlined/article_wght500_20px.svg"
                            color={"white"} />
                    </Container>
                </Container>
            </Container>
        </Container>
    );
}

export default Navbar;
