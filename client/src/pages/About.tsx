import { Container, CssBaseline, Typography } from "@mui/material";
import Title from "../components/Title";

function About() {
  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <CssBaseline />
        <Title mainText="About Our Business Card Project" subText=""></Title>
        <Typography gutterBottom variant="h5" component="div">
          Our Mission
        </Typography>
        <Typography>
          At our business card project, our mission is simple: to empower
          individuals and businesses to create stunning and impactful digital
          business cards that leave a lasting impression. We understand the
          importance of networking and connecting with others in today's
          fast-paced digital world, and our goal is to provide you with the
          tools you need to stand out from the crowd. enjoy!
        </Typography>
      </Container>
    </>
  );
}

export default About;
