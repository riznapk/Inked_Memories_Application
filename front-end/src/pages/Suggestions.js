import React, { useState } from "react";
import { useSelector } from "react-redux";
import DesignItem from "./DesignItem";
import { Grid } from "@mui/material";

function Suggestions() {
  const designList = useSelector((state) => state?.designs?.designList);
  const detectedObjectList = useSelector(
    (state) => state?.designs?.detectedObjectsList
  );

  const filteredDesignList = designList.filter((design) =>
    design.designType.some((type) => detectedObjectList.includes(type))
  );

  console.log("filteredDesignList", filteredDesignList);

  console.log("designList");
  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        justifyContent: "center",
        mx: "auto",
      }}
    >
      {console.log("hi", filteredDesignList)}
      {filteredDesignList?.map((item) => (
        <DesignItem
          // key={item?.designID}
          data={{
            designID: item?.designID,
            designName: item?.designName,
            designDescription: item?.designDescription,
            designPrice: item?.designPrice,
            designImageURI: item?.designImageURI,
          }}
        />
      ))}
    </Grid>
  );
}

export default Suggestions;
