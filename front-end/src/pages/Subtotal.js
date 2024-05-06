import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Subtotal.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { addOrder } from "../redux/orderReducer";
import api from "../api/axiosConfig";
import moment from "moment";

function Subtotal() {
  //initialisation
  const cart = useSelector((state) => state?.cart?.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //fecting userID
  const user = useSelector((state) => state?.user?.user);

  //for checkbox checking
  const [isEnvelopesChecked, setIsEnvelopesChecked] = useState(false);

  //total amount calculation
  const getCartTotal = (cart) => {
    let subTotal = 0;
    subTotal = cart?.reduce(
      (amount, item) => parseFloat(item.designPrice) + amount,
      0
    );
    // Add additional charge if envelopes are checked
    if (isEnvelopesChecked) {
      subTotal = subTotal + 0.99 * cart?.length;
    }
    return subTotal;
  };

  const amount = getCartTotal(cart);
  console.log("amoun", amount);

  //function to handle order confirmation
  const handleOrderConfirm = () => {
    let currentDate = moment().format("DD-MM-YYYY");
    let orderData = {
      cartItems: [...cart],
      orderID: uuid(),
      userID: user?.userID,
      amount: getCartTotal(cart),
      orderPlacedDate: currentDate,
      status: "processing",
    };
    console.log("orderData", orderData);
    dispatch(addOrder(orderData));
    // addDataToOrders(orderData);
    navigate("/payment");
  };

  //api to update orders collection
  //post function to make the call  to the database
  const addDataToOrders = async (inputData) => {
    try {
      const response = await api.post("/orders", {
        ...inputData,
      });
      if (response?.data?.message == "success") {
        //  dispatch(addOrder(orderData));
      }
    } catch (err) {
      console.error(err);
    }
  };

  //function to handle checkbox
  const handleEnvelopesCheckboxChange = (event) => {
    setIsEnvelopesChecked(event.target.checked);
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <>
            <p>
              Subtotal ({cart.length} items) : <strong>{value}</strong>
            </p>
            <small className="subtotal-gift">
              <input
                type="checkbox"
                name="envelopesCheckbox"
                id="envelopesCheckbox"
                checked={isEnvelopesChecked}
                onChange={handleEnvelopesCheckboxChange}
              />
              Add envelopes to protect your postcards with an additional charge
              of £ 0.99 per card.
            </small>
          </>
        )}
        decimalScale={2}
        value={getCartTotal(cart)}
        displayType={"text"}
        thousandSeparator={true}
        prefix="£"
      />
      <Button variant="contained" onClick={handleOrderConfirm}>
        PROCEED TO CHECKOUT
      </Button>
    </div>
  );
}

export default Subtotal;
