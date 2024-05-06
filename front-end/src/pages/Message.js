import { Box, Button, FormHelperText, Grid, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { convertDateFormat, fontOptions } from "../assets/utils/utils";
import { v4 as uuid } from "uuid";
import { inputAddressList } from "../assets/utils/utils";
import Header from "../components/Header";
import SelectedPostCardDisplay from "../components/SelectedPostCardDisplay";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartReducer";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import Popup from "../components/Popup";
import PersonalisedLetterForm from "./PersonalisedLetterForm";
import dayjs from "dayjs";

const Message = (props) => {
  //useparams hook to fetch if it includes letter or not
  const letter = useParams();
  // console.log("letter", letter);

  //get todays and tomorrow date
  const today = dayjs();
  const tomorrow = dayjs().add(1, "day");

  //initialisation
  const { selectedImage, orderType, designPrice } = props;
  const [isDataAdded, setIsDataAdded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //fecting user information
  const user = useSelector((state) => state?.user?.user);

  //getting selected desogn information
  const selectedDesignImageURI = useSelector(
    (state) => state?.designs?.selectedDesignItem?.designImageURI
  );

  const selectedDesignPrice = useSelector(
    (state) => state?.designs?.selectedDesignItem?.designPrice
  );

  // formik implementation
  const initialValues = {
    message: "",
    scheduledDate: "",
    selectedFont: "Arial",
    address: {
      houseNumber: "",
      streetAddress: "",
      city: "",
      county: "",
      postalCode: "",
    },
    letter: "",
  };

  //schema validation
  const postalCodeRegEx =
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

  const schema = yup.object().shape({
    scheduledDate: yup
      .date()
      .nullable()
      .min(new Date(), "Scheduled date cannot be before the present day")
      .max(
        new Date(
          new Date().getFullYear() + 2,
          new Date().getMonth(),
          new Date().getDate()
        ),
        "Scheduled date cannot be more than 2 years in the future"
      )
      .required("This is required."),
    address: yup.object().shape({
      houseNumber: yup.number()?.positive().integer(),
      streetAddress: yup.string().required("This is required."),
      city: yup.string().required("This is required."),
      county: yup.string().required("This is required."),
      postalCode: yup
        .string()
        .required("This is required.")
        .matches(postalCodeRegEx, "Invalid postal code"),
    }),
  });

  //formik initialisation
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("formik?.errors");
      console.log("clicked");
      const formattedScheduledDate = convertDateFormat(
        values.scheduledDate.toString()
      );

      //dispatching it to the cart and saving the cart data in the backend.
      let formattedData = {
        ...values,
        scheduledDate: formattedScheduledDate,
        designImageURI: selectedImage || selectedDesignImageURI,
        designFont: selectedFont,
        designPrice: designPrice || selectedDesignPrice,
        orderType: orderType || "non-customised",
        cartID: uuid(),
        userID: user?.userID,
        isLetterIncluded: letter?.letter == "letter" ? true : false,
      };

      dispatch(addToCart(formattedData));
      addDataToCart(formattedData);
    },
    validationSchema: schema,
  });

  //post function to make the call  to the database
  const addDataToCart = async (inputData) => {
    try {
      const response = await api.post("/cart", {
        ...inputData,
      });
      if (response?.data?.message == "success") {
        setIsDataAdded(true);
        navigate("/designs");
        console.log("isdata addded", isDataAdded);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //font change functions
  const [selectedFont, setSelectedFont] = useState("Arial");
  const handleFontChange = (event) => {
    // setSelectedFont(event.target.value);
    formik.setFieldValue("selectedFont", event.target.value);
  };
  console.log("formik?.values", formik?.values);

  return (
    <>
      <Header />
      <div style={styles.wrapper}>
        <SelectedPostCardDisplay
          selectedImage={selectedImage || selectedDesignImageURI}
        />
        <Grid container sx={styles.container}>
          <form style={styles.form}>
            <TextField
              name="message"
              label="Type in your message"
              variant="outlined"
              multiline
              rows={8}
              sx={{ fontFamily: formik.values.selectedFont, ...styles.message }}
              InputProps={{
                style: { fontFamily: formik.values.selectedFont },
              }}
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik?.errors.message && formik?.touched.message}
              helperText={
                formik?.errors.message && formik?.touched.message ? (
                  <span style={styles.error}>{formik?.errors.message}</span>
                ) : null
              }
            />
            <Grid item sx={{ my: 2 }}>
              <label htmlFor="fontSelect">Select Your Font: </label>
              <select
                id="fontSelect"
                // value={selectedFont}
                value={formik.values.selectedFont}
                name="selectedFont"
                onChange={handleFontChange}
                // onChange={formik?.handleChange}
              >
                {fontOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Grid>

            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Schedule your order"
                  onChange={(value) =>
                    formik?.setFieldValue("scheduledDate", value, true)
                  }
                  name="scheduledDate"
                  sx={styles.date}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label="Schedule your order"
                      name="scheduledDate"
                      value={formik?.values?.scheduledDate}
                      inputProps={{
                        placeholder: "Schedule your order",
                      }}
                      onBlur={formik.handleBlur}
                      error={Boolean(
                        formik?.touched?.scheduledDate &&
                          formik?.errors?.scheduledDate
                      )}
                      helperText={
                        formik?.errors?.scheduledDate &&
                        formik?.touched?.scheduledDate
                        // ? (
                        //   <span style={styles.error}>
                        //     {formik?.errors?.scheduledDate}
                        //   </span>
                        // ) : null
                      }
                      fullWidth
                    />
                  )}
                  disablePast // Disable past dates
                  minDate={tomorrow}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item sx={styles.address}>
              {inputAddressList.map((inputData, key) => (
                <TextField
                  key={`${key}-textfield`}
                  placeholder={inputData?.placeholder}
                  label={inputData?.label}
                  name={`address.${inputData?.key}`}
                  onChange={formik.handleChange}
                  sx={styles.inputfield}
                  error={
                    formik?.errors?.address?.[inputData?.key] ? true : false
                  }
                  helperText={formik?.errors?.address?.[inputData?.key]}
                />
              ))}
            </Grid>
          </form>
        </Grid>
      </div>
      {letter?.letter == "letter" ? (
        <PersonalisedLetterForm formik={formik} />
      ) : (
        ""
      )}
      <Box
        sx={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          my: 10,
        }}
      >
        <Button
          variant="contained"
          type="submit"
          onClick={formik?.handleSubmit}
        >
          CONFIRM AND ADD TO CART
        </Button>
      </Box>
      <Popup
        handleOpen={isDataAdded}
        handleClose={() => {
          setIsDataAdded(false);
        }}
        severity="success"
        message="Item added to your cart"
      />
      {/* <Footer /> */}
    </>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    mt: 10,
  },
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
    marginLeft: "200px",
    marginRight: "200px",
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
  link: {
    marginLeft: "8px",
    textDecoration: "none",
    fontWeight: "bold",
    color: "#797D62",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  message: {
    width: "700px",
  },
  date: {
    width: "700px",
    mt: 2,
    mb: 1,
  },
  inputfield: {
    m: 2,
    width: "700px",
  },
  address: {
    display: "flex",
    flexDirection: "column",
  },
};

export default Message;
