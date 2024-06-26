import { Container } from "@react-three/uikit";
import { Html } from "@react-three/drei";
import PanToolRoundedIcon from '@mui/icons-material/PanToolRounded';
import AdsClickRoundedIcon from '@mui/icons-material/AdsClickRounded';

// =====/=====/=====/=====



const Navbar = () => {
    return (
        <Container width={"100%"} height={50} positionType={"absolute"} positionTop={0} positionLeft={0} justifyContent={"center"} alignItems={"center"} marginTop={15}>
            <Container width={"auto"} justifyContent={"space-between"} alignItems={"center"} backgroundColor={"#232329"} borderRadius={10} padding={2} >
                <Container width={40} height={40} borderRadius={5} backgroundColor={"#403e6a"} margin={5}><Html><PanToolRoundedIcon /></Html></Container>
                <Container width={40} height={40} borderRadius={5} backgroundColor={"#403e6a"} margin={5}><Html><AdsClickRoundedIcon /></Html></Container>
                <Container width={40} height={40} borderRadius={5} backgroundColor={"#403e6a"} margin={5}><Html></Html></Container>
                <Container width={40} height={40} borderRadius={5} backgroundColor={"#403e6a"} margin={5}><Html></Html></Container>
                <Container width={40} height={40} borderRadius={5} backgroundColor={"#403e6a"} margin={5}><Html></Html></Container>
                <Container width={40} height={40} borderRadius={5} backgroundColor={"#403e6a"} margin={5}><Html></Html></Container>
                <Container width={40} height={40} borderRadius={5} backgroundColor={"#403e6a"} margin={5}><Html></Html></Container>
            </Container>
        </Container>
    );
}

export default Navbar;