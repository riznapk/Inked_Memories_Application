import { Button, Card, CardContent, Grid } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axiosConfig";
// Components
import CardInput from "./CardInput";
// Stripe
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../redux/orderReducer";
import { updateInitialCartInfo } from "../redux/cartReducer";

const Payment = () => {
  const navigate = useNavigate();
  //initialisation for stripe
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  //fecthing the user details
  const userEmail = useSelector((state) => state?.user?.user?.userEmail);

  //button handling
  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmitPay = async (event) => {
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);
    // to fetch the client secret
    // const res = await api.post("/payment", { userEmail: userEmail });
    // const clientSecret = res.data["client_secret"];
    // setClientSecret(clientSecret);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-placed`,
      },
      redirect: "if_required",
    });
    console.log("error", error);

    // if (error.type === "card_error" || error.type === "validation_error") {
    //   setMessage(error.message);
    // } else {
    //   setMessage("An unexpected error occured.");
    // }

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status == "succeeded") {
      setMessage("Payement status: " + paymentIntent.status);
      addDataToOrders();
      navigate("/order-placed");
    } else setMessage("Unexpected state");

    //the payment is succesfull
    //

    // const result = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //     billing_details: {
    //       email: userEmail,
    //     },
    //   },
    // });

    // if (result.error) {
    //   // Show error to your customer (e.g., insufficient funds)
    //   console.log(result.error.message);
    // } else {
    //   // The payment has been processed!
    //   if (result.paymentIntent.status === "succeeded") {
    //     // Show a success message to your customer
    //     // There's a risk of the customer closing the window before callback
    //     // execution. Set up a webhook or plugin to listen for the
    //     // payment_intent.succeeded event that handles any business critical
    //     // post-payment actions.
    //     console.log("You got 500$!");
    //   }
    // }
  };

  //api to update orders collection
  //post function to make the call  to the database
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state?.order?.order);
  const addDataToOrders = async () => {
    try {
      const response = await api.post("/orders", {
        ...orderData,
        payment: "completed",
      });
      if (response?.data?.message == "success") {
        dispatch(
          addOrder({
            ...orderData,
            payment: "completed",
          })
        );
        handleDeleteFromDB();
        setIsProcessing(false);
        navigate("/order-placed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  //api call to delete the items from the cart
  const handleDeleteFromDB = async () => {
    try {
      const response = await api.delete("/cart/remove");
      if (response?.data?.message == "success") {
        getCartDetails();
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

  return (
    <Card sx={styles.root}>
      <CardContent sx={styles.content}>
        <CardInput />
        <Grid sx={styles.div}>
          <Button
            variant="contained"
            color="primary"
            sx={styles.button}
            onClick={handleSubmitPay}
            disabled={isProcessing || !stripe || !elements}
          >
            {isProcessing ? "Processing ... " : "Place Order"}
          </Button>{" "}
          {/* Show any error or success messages */}
        </Grid>
        {message && (
          <div
            id="payment-message"
            style={{
              display: "flex",
              justifyContent: "center",
              color: "red",
            }}
          >
            {message}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const styles = {
  root: {
    maxWidth: 500,
    margin: "35vh auto",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignContent: "flex-start",
  },
  div: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  button: {
    margin: "2em auto 1em",
  },
};

export default Payment;
