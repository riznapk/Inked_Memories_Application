import React from "react";
import { Typography, Container } from "@mui/material";
import { useSelector } from "react-redux";

const OrderDetails = () => {
  //fetching the order information and order details
  const orderDetails = useSelector((state) => state?.order?.order);

  return (
    <section>
      <div>
        {orderDetails?.cartItems?.map((item) => (
          <img
            src={item?.designImageURI}
            alt=""
            style={{ width: "180px", height: "180px", margin: "10px" }}
          />
        ))}
        <div>
          <h5> Total Items: {orderDetails?.cartItems?.length}</h5>
          <h4> Total Amount: £{orderDetails.amount.toFixed(2)}</h4>
        </div>
      </div>
    </section>
  );
};

const styles = {
  container: {
    marginTop: "2rem",
    textAlign: "center",
  },
  title: {
    marginBottom: "1rem",
  },
};

export default OrderDetails;
