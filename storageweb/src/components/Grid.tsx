import { Container, Svg } from "@react-three/uikit";
// import { Html } from "@react-three/drei";
// import { EditOutlined, DeleteOutlined, InsertPhotoOutlined, InsertDriveFileOutlined } from "@material-ui/icons";
// import { BackHandOutlined, AdsClickOutlined } from "@mui/icons-material";
// import { useState, useCallback } from "react";

const Grid = () => {
    console.log("grid");
    
    return (
        <Container positionType={"absolute"} zIndexOffset={100}>
            <Svg src={"../assets/grid.svg"}/>
            <Svg src={"../assets/react.svg"}/>
        </Container>
    );
}

export default Grid;