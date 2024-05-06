import React, { useEffect } from "react";
import Header from "../components/Header";
import { Grid, Typography } from "@mui/material";
import { addDesignInfo } from "../redux/designListReducer";
import api from "../api/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import DesignItem from "./DesignItem";
import Footer from "../components/Footer";

const Designs = () => {
  const dispatch = useDispatch();
  const designList = useSelector((state) => state?.designs?.designList);

  useEffect(() => {
    if (designList && designList.length === 0) getDesignsData();
  }, []);

  const getDesignsData = async () => {
    try {
      const response = await api.get("/designs");
      if (response?.data) dispatch(addDesignInfo(response?.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header />
      <Grid sx={styles.caption}>
        <Typography>EXPLORE OUR COLLECTION WE HAVE GOT FOR YOU</Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          mx: "auto",
        }}
      >
        {designList?.map((item) => (
          <DesignItem
            // key={item?.designID}
            data={{
              designID: item?.designID,
              designName: item?.designName,
              designDescription: item?.designDescription,
              designPrice: item?.designPrice,
              designImageURI: item?.designImageURI,
              designType: item?.designType,
            }}
          />
        ))}
      </Grid>
      <Footer />
    </div>
  );
};

const styles = {
  caption: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
    my: 10,
  },
};

export default Designs;
