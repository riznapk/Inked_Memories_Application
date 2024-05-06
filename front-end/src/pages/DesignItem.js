import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addSelectedDesignItem } from "../redux/designListReducer";

function DesignItem({ data }) {
  //initialisation
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPrice, setShowPrice] = useState(false);

  // admin view
  const user = useSelector((state) => state?.user?.user);

  const handleClick = () => {
    dispatch(addSelectedDesignItem(data));
    if (user?.userProfile == "admin") navigate(`/designupload/${"edit"}`);
    else navigate(`/messages/${data?.designID}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        cursor: "pointer",
        transition: "transform 0.3s",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "inline-block",
        }}
        onMouseEnter={() => setShowPrice(true)}
        onMouseLeave={() => setShowPrice(false)}
      >
        {showPrice && <div>Price: {data?.designPrice}</div>}
        <img
          src={data?.designImageURI}
          alt="Design"
          style={{
            width: "500px",
            height: "300px",
            objectFit: "cover",
            margin: "10px",
            transform: "scale(1)",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        />
      </div>
    </div>
  );
}

export default DesignItem;
