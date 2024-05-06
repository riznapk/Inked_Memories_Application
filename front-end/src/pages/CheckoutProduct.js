import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axiosConfig";
import "../styles/CheckoutProduct.css";
import { Button } from "@mui/material";
import { removeFromCart, updateInitialCartInfo } from "../redux/cartReducer";
import Message from "./Message";

function CheckoutProduct(props) {
  //initialisation
  const {
    cartID,
    message,
    scheduledDate,
    designImageURI,
    designFont,
    address,
    designPrice,
    orderType,
    isUpdate,
    setIsUpdate,
    letter,
    isLetterIncluded,
  } = props;
  const dispatch = useDispatch();

  //remove from cart function
  const handleDelete = () => {
    dispatch(removeFromCart(cartID));
    handleDeleteFromDB(cartID);
  };

  //api call to delete the item from the db
  const handleDeleteFromDB = async (id) => {
    try {
      const response = await api.delete("/cart", {
        data: {
          cartID: id,
        },
      });

      if (response?.data?.message == "success") {
        getCartDetails();
        alert("Item removed from cart");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //fetching the updated cart details
  const getCartDetails = async () => {
    try {
      const response = await api.get("/cart");
      if (response?.data) dispatch(updateInitialCartInfo(response?.data));
    } catch (err) {
      console.log(err);
    }
  };

  //handling update function
  const handleUpdate = () => {
    setIsUpdate(true);
  };

  return (
    <div className="CheckoutProduct">
      <img className="CheckoutProduct-image" src={designImageURI} alt="" />
      <div className="CheckoutProduct-info">
        <p className="CheckoutProduct-date">Scheduled Date: {scheduledDate}</p>
        <p className="CheckoutProduct-price">
          <small>Price: £ </small>
          <strong>{designPrice}</strong>
        </p>
        <Button
          variant="contained"
          size="small"
          // className="CheckoutProduct-button"
          sx={{
            padding: "2px 8px",
            marginRight: "20px",
            fontSize: "12px",
          }}
          onClick={handleDelete}
        >
          Remove from Cart
        </Button>
        {/* <Button
          variant="contained"
          size="small"
          className="CheckoutProduct-button"
          onClick={handleUpdate}
        >
          Update Order
        </Button> */}
      </div>
    </div>
  );
}

export default CheckoutProduct;
