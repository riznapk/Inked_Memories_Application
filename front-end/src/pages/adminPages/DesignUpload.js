import React from "react";
import DesignDetails from "./DesignDetails";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Grid } from "@mui/material";

function DesignUpload() {
  return (
    <Grid>
      <Header />
      <DesignDetails />
      <Footer />
    </Grid>
  );
}

export default DesignUpload;
