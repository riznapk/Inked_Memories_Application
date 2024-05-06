import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import api from "../api/axiosConfig";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addUserInfo } from "../redux/userDetailsReducer";
import Popup from "../components/Popup";

const initialValues = {
  userPassword: "",
  userFirstName: "",
  userLastName: "",
  userEmail: "",
  userPhoneNumber: "",
  userPasswordConfirm: "",
};

const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const schema = yup.object().shape({
  userFirstName: yup.string().required("Required"),
  userLastName: yup.string().required("Required"),
  userPassword: yup
    .string()
    .required("Required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number and one special character."
    ),
  userPasswordConfirm: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("userPassword"), null], "Passwords do NOT match"),

  userPhoneNumber: yup
    .string()
    .required("Required")
    .matches(
      /^(?:(?:\+|00)44|0)\s*[1-9]\d{1,4}\s*\d{6,7}$/,
      "Please enter a valid UK phone number"
    ),
  userEmail: yup
    .string()
    .required("Required")
    .email("Email is invalid")
    .matches(emailRegEx, "Email is invalid"),
});

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uuid = uuidv4();

  const [message, setMessagae] = useState("");
  const [isAccountExist, setIsAccountExist] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      addNewUserOnRegister();
    },
    validationSchema: schema,
  });

  // call to the db for user registeration
  const addNewUserOnRegister = async () => {
    try {
      let userData = {
        ...formik?.values,
        userID: uuid,
        userProfile: "customer",
      };
      const response = await api.post("/users", userData);
      if (response?.data?.message == "success") {
        dispatch(addUserInfo(userData));
        navigate("/");
      } else if (response?.data?.message == "failure") {
        setIsAccountExist(true);
        setMessagae(response?.data?.status);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Grid
        container
        height="100vh"
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff",
            padding: "32px",
            borderRadius: "10px",
            boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
            mx: 20,
          }}
        >
          <Grid item>
            <TextField
              id="email"
              label="First Name"
              variant="outlined"
              sx={{ m: 2, minWidth: "300px" }}
              name="userFirstName"
              value={formik?.values?.userFirstName}
              onChange={formik?.handleChange}
              helperText={
                formik?.errors?.userFirstName && formik?.touched?.userFirstName
                  ? formik?.errors?.userFirstName
                  : null
              }
              error={
                formik?.errors?.userFirstName && formik?.touched?.userFirstName
                  ? formik?.errors?.userFirstName
                  : null
              }
            />
            <TextField
              name="userLastName"
              label="Last Name"
              variant="outlined"
              sx={{ m: 2, minWidth: "300px" }}
              value={formik.values.userLastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik?.errors.userLastName && formik?.touched.userLastName
              }
              helperText={
                formik?.errors.userLastName && formik?.touched.userLastName ? (
                  <span>{formik?.errors.userLastName}</span>
                ) : null
              }
            />
          </Grid>
          <Grid item>
            <TextField
              name="userEmail"
              label="Email"
              variant="outlined"
              sx={{ m: 2, minWidth: "300px" }}
              value={formik.values.userEmail}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik?.errors.userEmail && formik?.touched.userEmail}
              helperText={
                formik?.errors?.userEmail && formik?.touched?.userEmail ? (
                  <span>{formik?.errors.userEmail}</span>
                ) : null
              }
            />
            <TextField
              name="userPhoneNumber"
              label="Phone Number"
              variant="outlined"
              sx={{ m: 2, minWidth: "300px" }}
              value={formik.values.userPhoneNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik?.errors.userPhoneNumber &&
                formik?.touched.userPhoneNumber
              }
              helperText={
                formik?.errors.userPhoneNumber &&
                formik?.touched.userPhoneNumber ? (
                  <span>{formik?.errors.userPhoneNumber}</span>
                ) : null
              }
            />
          </Grid>

          <Grid item>
            <TextField
              type="password"
              name="userPassword"
              label="Password"
              variant="outlined"
              sx={{ m: 2, width: "300px" }}
              value={formik.values.userPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik?.errors.userPassword && formik?.touched.userPassword
              }
              helperText={
                formik?.errors.userPassword && formik?.touched?.userPassword ? (
                  <span>{formik?.errors.userPassword}</span>
                ) : null
              }
            />

            <TextField
              type="password"
              name="userPasswordConfirm"
              label="Confirm Password"
              variant="outlined"
              sx={{ m: 2, minWidth: "300px" }}
              value={formik.values.userPasswordConfirm}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik?.errors.userPasswordConfirm &&
                formik?.touched.userPasswordConfirm
              }
              helperText={
                formik?.errors.userPasswordConfirm &&
                formik?.touched?.userPasswordConfirm ? (
                  <span>{formik?.errors.userPasswordConfirm}</span>
                ) : null
              }
            />
          </Grid>

          <Button
            variant="contained"
            sx={{ m: 1, mb: 4 }}
            onClick={formik?.handleSubmit}
          >
            Register
          </Button>
          <Typography>
            Already a member?{" "}
            <Link
              to="/signin"
              style={{
                marginLeft: "3px",
                textDecoration: "none",
                fontWeight: "bold",
                color: "#797D62",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              SignIn Here
            </Link>
          </Typography>
        </Grid>
      </Grid>
      <Popup
        handleOpen={isAccountExist}
        handleClose={() => {
          setIsAccountExist(false);
        }}
        severity="error"
        message={message}
      />
    </>
  );
};

export default Register;
