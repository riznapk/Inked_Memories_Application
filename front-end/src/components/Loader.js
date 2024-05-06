import React from "react";
import logo from "../assets/images/logo2.png";

const Loader = () => {
  const styles = {
    margin: "auto",
    width: 50,
    height: 50,
    animation: "spinner 4s linear infinite",
    "@keyframes spinner": {
      "0%": {
        transform: "rotate(0deg)",
      },
      "100%": {
        transform: "rotate(360deg)",
      },
    },
  };

  return <img icon={logo} sx={styles} />;
};

export default Loader;
