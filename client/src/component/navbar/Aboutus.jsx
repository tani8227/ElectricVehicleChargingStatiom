import React from "react";
import { Container, Typography } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md" style={styles.container}>
      <Typography variant="h3" component="h1" gutterBottom style={styles.header}>
        About EV Rechaging Station 
      </Typography>
      <Typography variant="body1" paragraph style={styles.paragraph}>
        Welcome to EV Recharging Station ! Our platform is dedicated to making electric vehicle charging
        convenient and accessible. We provide users with the ability to search for nearby charging
        stations, book charging slots, and navigate seamlessly to their chosen location.
      </Typography>
      <Typography variant="body1" paragraph style={styles.paragraph}>
        Our mission is to support the growing EV community by offering reliable and easy-to-use
        tools that enhance the charging experience. We are committed to sustainability and
        innovation, helping to drive the transition to a greener future.
      </Typography>
      <Typography variant="body1" paragraph style={styles.paragraph}>
        Thank you for choosing EV Recharging Station. Together, let's power the future of transportation.
      </Typography>
    </Container>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    lineHeight: "1.6",
    color: "#333",
  },
  header: {
    marginBottom: "20px",
    color: "#222",
  },
  paragraph: {
    marginBottom: "15px",
  },
};

export default About;
