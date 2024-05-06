import React, { useState, useRef } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";
import Header from "../components/Header";
import postcard from "../assets/images/postcards.png";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Message from "./Message";
import Loader from "../components/Loader";

//model
import axios from "axios";
import { newAuthModelAPI } from "../api/axiosConfig";
import { addDetectedObjectList } from "../redux/designListReducer";
import Suggestions from "./Suggestions";
import Footer from "../components/Footer";

const PersonalisedDesigns = () => {
  //initialisation
  const [selectedImage, setSelectedImage] = useState(null);
  const [isNext, setIsNext] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //loader
  const [isLoading, setIsLoading] = useState(false);

  // to set the predictions has made or not
  const [isPredicted, setIsPredicted] = useState(false);

  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleImageInputChange = (event) => {
    const file = event.target.files.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // proceeding to next page
  const handleProceed = () => {
    setIsNext(true);
  };

  //handling next page
  const handleNext = async () => {
    setIsLoading(true);
    //api call and fecting results from model
    try {
      const base64ToBlob = (base64Data, contentType = "") => {
        const sliceSize = 1024;
        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (
          let offset = 0;
          offset < byteCharacters.length;
          offset += sliceSize
        ) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);

          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }

          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
      };

      const base64Image = selectedImage.replace(
        /^data:image\/(png|jpeg|jpg);base64,/,
        ""
      );
      console.log("base64Image", base64Image);
      const blob = base64ToBlob(base64Image, "image/jpg");

      const formData = new FormData();
      formData.append("video", blob, "image.jpg");

      const response = await newAuthModelAPI.post("/detect", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(addDetectedObjectList(response.data));
      setIsPredicted(true);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  console.log("predicted true or nor", isPredicted);

  return (
    <>
      {isNext ? (
        <Message
          selectedImage={selectedImage}
          orderType="customised"
          designPrice="3.99"
        />
      ) : (
        <div>
          <Header />
          <Grid sx={styles.caption}>
            <Typography>HAVE IT YOUR OWN WAY IN JUST £3.99</Typography>
          </Grid>
          <Grid container spacing={2} sx={styles.container}>
            <Grid item xs={6}>
              <Card sx={styles.card} onClick={handleImageUpload}>
                <CardContent sx={styles.cardContent}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageInputChange}
                    ref={fileInputRef}
                    style={{ display: "none" }}
                  />
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Uploaded"
                      style={{ width: "100%", marginBottom: "16px" }}
                    />
                  ) : (
                    <span style={{ fontSize: "18px" }}>
                      Upload your image here
                    </span>
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={styles.cardBack}>
                <CardContent sx={styles.cardContent}>
                  <img
                    src={postcard}
                    alt="Placeholder postcard"
                    style={{ width: "100%", marginBottom: "16px" }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              my: 5,
            }}
          >
            <Button variant="contained" onClick={handleNext}>
              {isLoading ? "Processing Request... " : "SUGGEST SIMILAR DESIGNS"}
            </Button>
            <Box sx={{ mx: 5 }}>
              <Button variant="contained" onClick={handleProceed}>
                PROCEED WITH SELCECTED DESIGN
              </Button>
            </Box>
          </Box>

          {isPredicted && <Suggestions />}
          <Footer />
        </div>
      )}
    </>
  );
};

const styles = {
  caption: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "bold",
    my: 10,
  },
  container: {
    px: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    minHeight: "450px",
    minWidth: "600px",
    cursor: "pointer",
    background: "linear-gradient(rgba(245, 239, 232, 0.8), #f5efe8)",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s",
    "&:hover": {
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    },
  },
  cardBack: {
    minHeight: "450px",
    minWidth: "600px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    transition: "box-shadow 0.3s",
    "&:hover": {
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
    },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
};

export default PersonalisedDesigns;
