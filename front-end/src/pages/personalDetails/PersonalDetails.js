import React from "react";
import Card from "@mui/material/Card";

import { Grid, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useFormik } from "formik";

import { gender } from "../../assets/utils/utils";
import { SelectField } from "../../components/SelectField";
import { initialValues, validateSchema } from "./FormValidations";

export const PersonalDetails = (props) => {
  //   useEffect(() => {
  //     if (location?.pathname === URLData.profileEdit.url) {
  //       formik?.setValues(personalDetails);
  //       formik?.setFieldValue("gender", personalDetails.gender);
  //       formik?.setFieldValue("dob", personalDetails.dob);
  //     }
  //   }, [personalDetails]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      "HELLO";
    },
    validationSchema: validateSchema,
  });

  return (
    <div>
      <Card sx={styles.cardItem}>
        <Grid sx={{ px: 2, py: 1 }}>
          <Typography sx={styles.textPadding}>Personal Info</Typography>
          <Grid container spacing={2} sx={styles.textPadding}>
            <Grid item xs={12} md={6} sm={12} lg={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formik?.values?.firstName}
                onChange={formik?.handleChange}
                sx={styles.inputField}
                helperText={
                  formik?.errors?.firstName && formik?.touched?.firstName
                    ? formik?.errors?.firstName
                    : null
                }
                error={
                  formik?.errors?.firstName && formik?.touched?.firstName
                    ? formik?.errors?.firstName
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} md={6} sm={12} lg={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formik?.values?.lastName}
                onChange={formik?.handleChange}
                sx={styles.inputField}
                variant="outlined"
                helperText={
                  formik?.errors?.lastName && formik?.touched?.lastName
                    ? formik?.errors?.lastName
                    : null
                }
                error={
                  formik?.errors?.lastName && formik?.touched?.lastName
                    ? formik?.errors?.lastName
                    : null
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={styles.textPadding}>
            <Grid item xs={12} md={6} sm={12}>
              <TextField
                label="Email"
                name="email"
                value={formik?.values?.email}
                onChange={formik?.handleChange}
                sx={styles.inputField}
                helperText={
                  formik?.errors?.email && formik?.touched?.email
                    ? formik?.errors?.email
                    : null
                }
                error={
                  formik?.errors?.email && formik?.touched?.email
                    ? formik?.errors?.email
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} md={6} sm={12} lg={6}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formik?.values?.phoneNumber}
                onChange={formik?.handleChange}
                sx={styles.inputField}
                helperText={
                  formik?.errors?.phoneNumber && formik?.touched?.phoneNumber
                    ? formik?.errors?.phoneNumber
                    : null
                }
                error={
                  formik?.errors?.phoneNumber && formik?.touched?.phoneNumber
                    ? formik?.errors?.phoneNumber
                    : null
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={styles.textPadding}>
            <Grid item xs={12} md={6} sm={12} lg={6}>
              <SelectField
                label="Gender"
                name="gender"
                options={gender}
                // defaultValue={formik?.values?.gender}
                value={formik?.values?.gender ?? ""}
                onChange={(e) =>
                  formik.setFieldValue("gender", e?.target?.value)
                }
                helperText={
                  formik?.errors?.gender && formik?.touched?.gender
                    ? formik?.errors?.gender
                    : null
                }
                error={
                  formik?.errors?.gender && formik?.touched?.gender
                    ? formik?.errors?.gender
                    : null
                }
              />
            </Grid>
            <Grid item xs={12} md={6} sm={12} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  onChange={(value) =>
                    formik?.setFieldValue("dob", value, true)
                  }
                  label="Date of Birth"
                  value={formik?.values?.dob}
                  inputProps={{
                    placeholder: "Date of Birth",
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={Boolean(
                        formik?.touched?.dob && formik?.errors?.dob
                      )}
                      helperText={formik?.touched?.dob && formik?.errors?.dob}
                      label="Date of Birth"
                      name="dob"
                      fullWidth
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

const styles = {
  cardItem: { my: 10, padding: 5 },
  accountIconButton: { color: "#457a76" },
  accountIcon: { height: 100, width: 100 },
  inputField: {
    width: "100%",
  },
  textPadding: { pb: 2 },
};
