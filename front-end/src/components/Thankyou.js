import React from "react";
import { Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleRedirectHome = () => {
    navigate("/");
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={styles.container}>
        <Typography variant="h4" sx={styles.title}>
          Thank You for Your Order
        </Typography>
        <Typography variant="body1" sx={styles.message}>
          Your order is being processed.
        </Typography>
        <Typography variant="body1" sx={styles.message}>
          Please redirect to the home page to continue shopping.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleRedirectHome}
          sx={styles.button}
        >
          Go to Home Page
        </Button>
      </Container>
    </>
  );
};

const styles = {
  container: {
    marginTop: "2rem",
    textAlign: "center",
  },
  title: {
    marginBottom: "1rem",
  },
  message: {
    marginBottom: "0.5rem",
  },
  button: {
    marginTop: "1rem",
  },
};

export default ThankYouPage;
