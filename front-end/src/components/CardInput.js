import React from "react";
//stripe
import { CardElement, PaymentElement } from "@stripe/react-stripe-js";
import { ExpressCheckoutElement } from "@stripe/react-stripe-js";
import { Typography } from "@mui/material";

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

function CardInput() {
  // return <CardElement options={CARD_ELEMENT_OPTIONS} />;
  return <PaymentElement id="payment-element" />;
}

export default CardInput;
