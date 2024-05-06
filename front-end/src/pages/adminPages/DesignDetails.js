import {
  Box,
  Button,
  Card,
  CardContent,
  FormHelperText,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { ErrorMessage, useFormik } from "formik";
import React, { useState, useRef, useEffect } from "react";
import * as yup from "yup";
import api from "../../api/axiosConfig";
import Header from "../../components/Header";
import SelectedPostCardDisplay from "../../components/SelectedPostCardDisplay";
import { useDispatch, useSelector } from "react-redux";
import {
  addDesignInfo,
  addDetectedObjectList,
  uploadDesignDetails,
} from "../../redux/designListReducer";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { newAuthModelAPI } from "../../api/axiosConfig";

const DesignDetails = () => {
  //initialisation
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // formik implementation
  const initialValues = {
    designName: "",
    designDescription: "",
    designPrice: "",
    designType: [],
    designImageURI: "",
  };

  //validation schema
  const schema = yup.object().shape({
    designPrice: yup
      .number()
      .typeError("Price must be a number")
      .positive("Price must be a positive number")
      .required("Price is required"),
    designImageURI: yup.string().required("Design image is required"),
  });

  //formik initialisation
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      let designDataValues = { ...values, designID: uuid() };
      dispatch(uploadDesignDetails(designDataValues));
      uploadDesignToDatabase(designDataValues);
    },
    validationSchema: schema,
  });

  //post function to make the call  to the database
  const uploadDesignToDatabase = async (inputData) => {
    try {
      const response = await api.post("/designs", {
        ...inputData,
      });
      if (response?.data?.message == "success") {
        getDesignsData();
        navigate("/designs");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //to fectch the updated details from the reducer
  const getDesignsData = async () => {
    try {
      const response = await api.get("/designs");
      if (response?.data) dispatch(addDesignInfo(response?.data));
    } catch (err) {
      console.log(err);
    }
  };

  //image upload handling
  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleImageInputChange = (event) => {
    // const file = event.target.files[0];

    const file = event.target.files.item(0);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        //for detection
        if (e.target.result) {
          handleDetect(e.target.result);
        }
        formik.setFieldValue("designImageURI", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [isPredicted, setIsPredicted] = useState(false);
  // for detecting objects
  //handling next page
  const detectedObjectsList = useSelector(
    (state) => state?.designs?.detectedObjectsList
  );
  const handleDetect = async (image) => {
    console.log("detect");
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

      const base64Image = image.replace(
        /^data:image\/(png|jpeg|jpg);base64,/,
        ""
      );

      const blob = base64ToBlob(base64Image, "image/jpg");

      const formData = new FormData();
      formData.append("video", blob, "image.jpg");

      const response = await newAuthModelAPI.post("/detect", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(addDetectedObjectList(response.data));
      setDesignTypes(response.data);
      setIsPredicted(true);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  //to handle design type
  const [designTypes, setDesignTypes] = useState([]);

  // converting the values into an array
  const handleChange = (event) => {
    const inputValue = event.target.value;
    const designTypesArray = inputValue.split(" ");
    setDesignTypes(designTypesArray);
    // setDesignTypes([...designTypesArray, ...detectedObjectsList]);
    // let combinedDesignType = [...designTypesArray, ...detectedObjectsList];
    formik.setFieldValue("designType", designTypesArray);
  };

  console.log("formik value of design type", formik?.values?.designType);

  //admin view
  const { edit } = useParams();
  const user = useSelector((state) => state?.user?.user);
  const selectedDesign = useSelector(
    (state) => state?.designs?.selectedDesignItem
  );
  useEffect(() => {
    if (edit == "edit") {
      formik?.setValues(selectedDesign);
      setSelectedImage(selectedDesign?.designImageURI);
      setDesignTypes(selectedDesign?.designType);
    } else {
      formik?.setValues(initialValues);
      setSelectedImage("");
      setDesignTypes([]);
    }
  }, [edit]);

  const handleUpdate = () => {
    handleUpdateInDB();
  };

  const handleDelete = () => {
    handleDeleteFromDB();
  };

  //api call to delete the item from the db
  const handleDeleteFromDB = async () => {
    try {
      const response = await api.delete("/designs", {
        data: {
          designID: selectedDesign?.designID,
        },
      });

      if (response?.data?.message == "success") {
        getDesignsData();
        alert("Design Removed from Collections");
        navigate("/designs");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //api call to update the item in the data base
  const handleUpdateInDB = async () => {
    try {
      const response = await api.put("/designs", { ...formik?.values });
      if (response?.data?.message == "success") {
        getDesignsData();
        alert("Design Updated");
        navigate("/designs");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div style={styles.wrapper}>
        <Grid container sx={styles.container}>
          <Grid item xs={6} sx={styles.wrapper}>
            <Card sx={styles.card} onClick={handleImageUpload}>
              <CardContent sx={styles.cardContent}>
                <input
                  type="file"
                  name="designImageURI"
                  accept="image/*"
                  onChange={handleImageInputChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
                {formik?.errors?.designImageURI && (
                  <FormHelperText sx={{ color: "red" }}>
                    Design image is required
                  </FormHelperText>
                )}
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Uploaded"
                    style={{
                      width: "100%",
                      height: "auto",
                      marginBottom: "16px",
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "18px" }}>
                    Upload your image here
                  </span>
                )}
              </CardContent>
            </Card>
          </Grid>

          <form onSubmit={formik.handleSubmit} style={styles.form}>
            <Typography variant="h6" color="grey">
              Type in the design details below.
            </Typography>
            <Grid item sx={{ my: 2 }}>
              <TextField
                name="designName"
                label="Design name"
                variant="outlined"
                sx={styles.message}
                value={formik.values.designName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik?.errors.designName && formik?.touched.designName}
                helperText={
                  formik?.errors.designName && formik?.touched.designName ? (
                    <span style={styles.error}>
                      {formik?.errors.designName}
                    </span>
                  ) : null
                }
              />
            </Grid>
            <Grid item sx={{ mb: 2 }}>
              <TextField
                name="designDescription"
                label="Design description"
                variant="outlined"
                sx={styles.message}
                value={formik.values.designDescription}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik?.errors.designDescription &&
                  formik?.touched.designDescription
                }
                helperText={
                  formik?.errors.designDescription &&
                  formik?.touched.designDescription ? (
                    <span style={styles.error}>
                      {formik?.errors.designDescription}
                    </span>
                  ) : null
                }
              />
            </Grid>
            <Grid item sx={{ mb: 2 }}>
              <TextField
                name="designPrice"
                label="Design price*"
                variant="outlined"
                sx={styles.message}
                value={formik.values.designPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik?.errors.designPrice && formik?.touched.designPrice
                }
                helperText={
                  formik?.errors.designPrice && formik?.touched.designPrice ? (
                    <span style={styles.error}>
                      {formik?.errors.designPrice}
                    </span>
                  ) : null
                }
              />
            </Grid>
            <Grid item sx={{ mb: 3 }}>
              <TextField
                name="designType"
                label="Design type"
                variant="outlined"
                sx={styles.message}
                value={designTypes.join(" ")}
                onChange={handleChange}
                placeholder="Enter design types separated by spaces"
                multiline
                rows={3}
                onBlur={formik.handleBlur}
                error={formik?.errors.designType && formik?.touched.designType}
                helperText={
                  formik?.errors.designType && formik?.touched.designType ? (
                    <span style={styles.error}>
                      {formik?.errors.designType}
                    </span>
                  ) : null
                }
              />
            </Grid>
            {/* admin view */}
            {edit && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" onClick={handleUpdate}>
                  Update Design
                </Button>
                <Button variant="contained" onClick={handleDelete}>
                  Delete Design
                </Button>
              </Box>
            )}
            {!edit && (
              <Button variant="contained" onClick={formik?.handleSubmit}>
                Add To Design Collection
              </Button>
            )}
          </form>
        </Grid>
      </div>
    </>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    mx: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    // mx: "auto",
    // marginLeft: "200px",
    // marginRight: "200px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "32px",
    borderRadius: "10px",
    boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
    minWidth: "500px",
  },
  input: {
    margin: "8px",
    width: "100%",
  },
  error: {
    color: "red",
  },
  button: {
    margin: "16px 0",
    backgroundColor: "#797D62",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#AA7575",
    },
  },
  text: {
    display: "flex",
    alignItems: "center",
    marginTop: "16px",
  },

  message: {
    width: "700px",
  },

  card: {
    minHeight: "350px",
    minWidth: "500px",
    maxHeight: "350px",
    maxWidth: "500px",
    cursor: "pointer",
    background: "linear-gradient(rgba(245, 239, 232, 0.8), #f5efe8)",
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
  },
};

export default DesignDetails;
