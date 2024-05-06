import React, { useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";

import Header from "../components/Header";
import bannerImage from "../assets/images/banner.png";
import Footer from "../components/Footer";
import logoImage from "../assets/images/logo2.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axiosConfig";
import { updateInitialCartInfo } from "../redux/cartReducer";
import { addDesignInfo } from "../redux/designListReducer";

const HomePage = () => {
  //initialisation
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //background logo image
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.backgroundImage = `url(${logoImage})`;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundPosition = "center";
    body.style.backgroundSize = "50px";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundBlendMode = "multiply";
  }, []);

  //fetching user and cart details from the reducers
  const user = useSelector((state) => state?.user?.user);
  const cart = useSelector((state) => state?.cart?.cart);

  const designList = useSelector((state) => state?.designs?.designList);
  //fetching the cart details of the user
  useEffect(() => {
    if (cart?.length == 0 && designList && designList.length === 0) {
      getCartData();
      getDesignsData();
    }
  }, [cart]);

  const getCartData = async () => {
    try {
      const response = await api.get(`/cart/${user?.userID}`);
      if (response?.data) dispatch(updateInitialCartInfo(response?.data));
    } catch (err) {
      console.log(err);
    }
  };

  const getDesignsData = async () => {
    try {
      const response = await api.get("/designs");
      if (response?.data) dispatch(addDesignInfo(response?.data));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <Grid sx={Styles.banner}>
        <img
          src={bannerImage}
          alt="Banner"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Grid>
      <Grid
        container
        sx={{ flexGrow: 1, px: 20, pb: 10, mt: "70px" }}
        alignItems="center"
        spacing={5}
      >
        <Grid item xs={6}>
          <img
            src="https://images.unsplash.com/photo-1621132352783-b948f9233ff5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
            alt="Example Image"
            style={Styles.image}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">
            Keep the Tradition Alive, Send Postcards with Ease!
          </Typography>
          <Typography variant="body1">
            Experience the joy of sending heartfelt messages through our
            user-friendly platform, preserving the time-honored tradition of
            postcard sending.
          </Typography>
          <Box
            sx={{
              mt: 4,
            }}
          >
            <Button variant="contained" onClick={() => navigate("/designs")}>
              Choose From Our Collection
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ flexGrow: 1, px: 20, pb: 10 }}
        alignItems="center"
        spacing={5}
      >
        <Grid item xs={6}>
          <Typography variant="h5">
            Unleash Your Creativity, Make Every Postcard a Masterpiece!
          </Typography>
          <Typography variant="body1">
            With our platform's robust customization and personalization
            options, let your imagination run wild and create postcards that are
            truly one-of-a-kind. From heartfelt messages to personalized photos,
            bring your vision to life and make a lasting impression with each
            customized postcard.
          </Typography>
          <Box
            sx={{
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate("/personalised")}
            >
              Personalise and Create Your Card
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <img
            src="https://images.unsplash.com/photo-1497942304796-b8bc2cc898f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80"
            alt="Example Image"
            style={Styles.image}
          />
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ flexGrow: 1, px: 20, pb: 10 }}
        alignItems="center"
        spacing={5}
      >
        <Grid item xs={6}>
          <img
            src="https://images.unsplash.com/photo-1462642109801-4ac2971a3a51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1546&q=80"
            alt="Example Image"
            style={Styles.image}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">
            Time Capsule of Sentiments, Unveil Memories in the Future!
          </Typography>
          <Typography variant="body1">
            Send postcards to your future self, capturing the essence of the
            present and creating a bridge to the future. Preserve cherished
            memories, heartfelt emotions, and reflections, ready to be
            rediscovered and treasured when the time is right. Our platform
            helps you create a tapestry of memories that unfolds over time.
          </Typography>
          <Box
            sx={{
              mt: 4,
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate(`/personalised/${"letter"}`)}
            >
              PERSONLISE WITH A FUTURE LETTER
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{ flexGrow: 1, px: 20, pb: 10 }}
        alignItems="center"
        spacing={5}
      >
        <Grid item xs={6}>
          <Typography variant="h5">
            Surprise with Perfect Timing, Moments Delivered on Demand!
          </Typography>
          <Typography variant="body1">
            With our scheduled delivery feature, plan and schedule postcard
            arrivals for special occasions, ensuring your heartfelt messages
            reach their recipients precisely when you want them to. Create
            unforgettable surprises and make every moment count with our
            convenient scheduling options.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img
            src="https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80"
            alt="Example Image"
            style={Styles.image}
          />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

const Styles = {
  banner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  container: {
    px: 3,
  },
  image: { marginRight: "70px", width: "700px", height: "500px" },
  text: {
    whiteSpace: "normal",
  },
};

export default HomePage;
