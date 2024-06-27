import { Container, Svg } from "@react-three/uikit";
import { Html } from "@react-three/drei";
import { EditOutlined, DeleteOutlined, InsertPhotoOutlined, InsertDriveFileOutlined } from "@material-ui/icons";
import { BackHandOutlined, AdsClickOutlined } from "@mui/icons-material";
import { useState, useCallback } from "react";


// =====/=====/=====/=====


const Navbar = () => {
    // const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // const handleMouseEnter = useCallback((index: number) => {
    //     setHoveredIndex(index);
    // }, []);

    // const handleMouseLeave = useCallback(() => {
    //     setHoveredIndex(null);
    // }, []);

    const icons = [
        { icon: <Svg width={16} height={16} src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/back_hand/materialsymbolsoutlined/back_hand_wght500_20px.svg" color={"#7f7f7f"} />, backgroundColor: "#232329" },
        { icon: <Svg width={16} height={16} src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/ads_click/materialsymbolsoutlined/ads_click_wght500_20px.svg" color={"#79706c"} />, backgroundColor: "#403e6a" },
        { icon: <Svg width={16} height={16} src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/edit/materialsymbolsoutlined/edit_wght500_20px.svg" color={"#79706c"} />, backgroundColor: "#232329" },
        { icon: <Svg width={14} height={14} src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/delete/materialsymbolsoutlined/delete_wght500_20px.svg" color={"#79706c"} />, backgroundColor: "#232329" },
        { icon: <Svg width={16} height={16} src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/photo/materialsymbolsoutlined/photo_wght500_20px.svg" color={"#79706c"} />, backgroundColor: "#31303b" },
        { icon: <Svg width={16} height={16} src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/drive_file/materialsymbolsoutlined/drive_file_wght500_20px.svg" color={"#79706c"} />, backgroundColor: "#31303b" }
    ];

    return (
        <Container width={"100%"} height={50} positionType={"absolute"} positionTop={0} positionLeft={0} justifyContent={"center"} alignItems={"center"} marginTop={15}>
            <Container width={"auto"} justifyContent={"space-around"} alignItems={"center"} backgroundColor={"#232329"} borderRadius={10} padding={2}>
                {icons.map((item, index) => (
                    <Container
                        key={index}
                        width={40}
                        height={40}
                        borderRadius={5}
                        // backgroundColor={hoveredIndex === index ? "#31303b" : item.backgroundColor}
                        margin={5}
                        justifyContent={"center"}
                        alignItems={"center"}
                        // onPointerEnter={() => handleMouseEnter(index)}
                        // onPointerLeave={handleMouseLeave}
                        hover={{ backgroundColor: "#31303b" }}
                    >
                        <Container width={16} height={16} hover={{ backgroundColor: "#31303b" }}>
                            {/* <Html onPointerEnter={() => handleMouseEnter(index)} onPointerLeave={handleMouseLeave}>
                                <div style={{ pointerEvents: "none" }}>
                                    {item.icon}
                                </div>
                            </Html> */}

                            {item.icon}

                            {/* <Svg width={20} height={20} src="https://raw.githubusercontent.com/google/material-design-icons/40811b1dea7c91e4221d353a35c10490b93e8778/symbols/web/back_hand/materialsymbolsoutlined/back_hand_20px.svg" color={"white"} /> */}
                        </Container>
                    </Container>
                ))}
            </Container>
        </Container>
    );
}

export default Navbar;
