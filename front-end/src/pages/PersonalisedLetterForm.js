import React from "react";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import { Grid, Typography } from "@mui/material";

const initialValues = {
  letter: "",
};

const PersonalisedLetterForm = (props) => {
  const { formik } = props;

  console.log("foemik", formik?.values);

  return (
    <Grid>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          minWidth: "500px",
          marginLeft: "100px",
          marginRight: "100px",
        }}
      >
        <Typography variant="h6" color="primary">
          Unlock the power of your words, and let your message take center stage
          in the spotlight.
        </Typography>
        <TextField
          id="letter"
          name="letter"
          label="Write a letter"
          placeholder="Hey Future Self"
          multiline
          sx={{ width: "100%" }}
          minRows={20}
          maxRows={100}
          value={formik.values.letter}
          onChange={formik.handleChange}
          error={formik.touched.letter && Boolean(formik.errors.letter)}
          helperText={formik.touched.letter && formik.errors.letter}
        />
      </form>
    </Grid>
  );
};

export default PersonalisedLetterForm;
