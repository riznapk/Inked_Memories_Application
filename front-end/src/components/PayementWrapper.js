import { useEffect, useState } from "react";
import Payment from "./Payment";
//stripe imports
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
//importing api config
import api from "../api/axiosConfig";
import Header from "./Header";
import OrderDetails from "./OrderDetails";
import { Grid, Typography } from "@mui/material";
import Footer from "./Footer";

function PaymentWrapper() {
  //const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  //fecthing the user details and order details
  const userEmail = useSelector((state) => state?.user?.user?.userEmail);
  const orderDetails = useSelector((state) => state?.order?.order);

  const stripePromise = loadStripe(
    "pk_test_51NT1c8JpzmGSEOSao8K2mHP7ZrOxXsVt2FOfWpgUN8R5wt7GLSCFErN0Jkr0A3vEsJ6vakvcC7msdxb9SYkZkuNL00pSSui50z"
  );

  useEffect(() => {
    handleClientSecretKey();
  }, []);

  // Convert the amount to the smallest currency unit (pence)
  const amountInPence = Math.round(orderDetails.amount * 100);

  const handleClientSecretKey = async () => {
    // to fetch the client secret
    const res = await api.post("/payment", {
      userEmail: userEmail,
      amount: amountInPence,
    });
    const clientSecret = res.data["client_secret"];
    setClientSecret(clientSecret);
  };

  return (
    <div>
      <Header />
      <OrderDetails />
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              my: 10,
            }}
          >
            <Typography variant="h6">
              Please provide your card details below.
            </Typography>
          </Grid>

          <Payment />
        </Elements>
      )}
      <Footer />
    </div>
  );
}

export default PaymentWrapper;
