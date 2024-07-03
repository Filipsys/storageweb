import { Container, Svg } from "@react-three/uikit";
import { Html } from "@react-three/drei";
// import { EditOutlined, DeleteOutlined, InsertPhotoOutlined, InsertDriveFileOutlined } from "@material-ui/icons";
// import { BackHandOutlined, AdsClickOutlined } from "@mui/icons-material";

const Grid = () => {
    return (
        <Container positionType={"relative"} width={"100%"} height={"100%"}>
            <Html>
                <div style={{
                    width: "200%",
                    height: "100%",
                    backgroundImage: "radial-gradient(circle, rgba(250, 128, 114, 0.6) 10%, transparent 10%",
                    backgroundSize: "50px 50px",
                    backgroundPosition: "50px 0",
                    backgroundRepeat: "repeat", 
                }}>
                </div>
            </Html>
        </Container>
    );
}
{/* <Svg src={"http://localhost:3000/assets?path=grid.svg"} width={"60%"} height={"60%"} color={"white"} opacity={0.2} positionLeft={"-20%"} positionTop={"-20%"} /> */}
{/* <Svg src={"http://localhost:3000/assets?path=grid.svg"} width={"60%"} height={"60%"} color={"white"} opacity={0.2} positionLeft={"-20.2%"} positionTop={"-20%"} /> */}
{/* <Svg src={"http://localhost:3000/assets?path=grid.svg"} width={"60%"} height={"60%"} color={"white"} opacity={0.2} positionLeft={"-20%"} positionTop={"-40%"} /> */}
{/* <Svg src={"http://localhost:3000/assets?path=grid.svg"} width={"60%"} height={"60%"} color={"white"} opacity={0.2} positionLeft={"-20.2%"} positionTop={"-40%"} /> */}

export default Grid;