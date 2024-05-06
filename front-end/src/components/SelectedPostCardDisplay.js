import React from "react";
import postcard from "../assets/images/postcards.png";
import { useSelector } from "react-redux";
import { Card, CardContent, Grid } from "@mui/material";

function SelectedPostCardDisplay({ selectedImage }) {
  return (
    <Grid container sx={styles.container}>
      <Grid item xs={12} md={6}>
        <Card sx={styles.card}>
          <CardContent sx={styles.cardContent}>
            <img
              src={selectedImage}
              alt="Uploaded"
              style={{ width: "100%", maxWidth: "300px" }}
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={styles.cardBack}>
          <CardContent>
            <img
              src={postcard}
              alt="Placeholder postcard"
              style={{ width: "100%" }}
            />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "500px",
    m: "auto",
    width: "900px",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    maxHeight: "450px",
    maxWidth: "400px",
    background: "linear-gradient(rgba(245, 239, 232, 0.8), #f5efe8)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  cardBack: {
    maxHeight: "450px",
    maxWidth: "400px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
};

export default SelectedPostCardDisplay;
