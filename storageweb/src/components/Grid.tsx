import { Container } from "@react-three/uikit";
import { Html } from "@react-three/drei";

const Grid = () => {
    return (
        <Container width={"100%"} height={"100%"}>
            <Html>
                <div style={{
                    width: '100vw',
                    height: '100vh',
                    backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 10%, transparent 10%)',
                    backgroundSize: '30px 30px',
                    }}>
                </div>
            </Html>
        </Container>
    );
}

export default Grid;



{/* <Svg src={"http://localhost:3000/assets?path=grid.svg"} width={"60%"} height={"60%"} color={"white"} opacity={0.2} positionLeft={"-20%"} positionTop={"-20%"} /> */}
{/* <Svg src={"http://localhost:3000/assets?path=grid.svg"} width={"60%"} height={"60%"} color={"white"} opacity={0.2} positionLeft={"-20.2%"} positionTop={"-20%"} /> */}
{/* <Svg src={"http://localhost:3000/assets?path=grid.svg"} width={"60%"} height={"60%"} color={"white"} opacity={0.2} positionLeft={"-20%"} positionTop={"-40%"} /> */}
{/* <Svg src={"http://localhost:3000/assets?path=grid.svg"} width={"60%"} height={"60%"} color={"white"} opacity={0.2} positionLeft={"-20.2%"} positionTop={"-40%"} /> */}