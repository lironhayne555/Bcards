import { Container, CssBaseline } from "@mui/material";
import Title from "../components/Title";

function About() {
    return (  <>
     <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
              <CssBaseline />
    <Title mainText="BCard"
    subText="Create free, custom business card designs"></Title>
    </Container>
    </>);
}

export default About;