import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/SignIn";
import Register from "../pages/Register";
import HomePage from "../pages/HomePage";
import Designs from "../pages/Designs";
import PersonalisedDesigns from "../pages/PersonalisedDesigns";
import { PersonalDetails } from "../pages/personalDetails/PersonalDetails";
import Message from "../pages/Message";
import PersonalisedLetterForm from "../pages/PersonalisedLetterForm";
import DesignUpload from "../pages/adminPages/DesignUpload";
import Checkout from "../pages/Checkout";
import ProtectedRoutes from "./ProtectedRoutes";
import PageNotFound from "./PageNotFound";
import Payment from "./Payment";
import PaymentWrapper from "./PayementWrapper";
import ThankYouPage from "./Thankyou";
import Orders from "../pages/Orders";

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path={"/signin"} element={<Signin />}></Route>
        <Route path={"/register"} element={<Register />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path={"/designs"} element={<Designs />}></Route>
          <Route
            path={"/personalised"}
            element={<PersonalisedDesigns />}
          ></Route>
          <Route
            path={"/personalised/:letter"}
            element={<PersonalisedDesigns />}
          ></Route>
          <Route path={"/letter"} element={<PersonalisedLetterForm />}></Route>
          <Route path={"/messages/:designId"} element={<Message />}></Route>
          <Route path={"/details"} element={<PersonalDetails />}></Route>
          <Route path={"/designupload"} element={<DesignUpload />}></Route>
          <Route
            path={"/designupload/:edit"}
            element={<DesignUpload />}
          ></Route>
          <Route path={"/mycart"} element={<Checkout />}></Route>
          <Route path={"/payment"} element={<PaymentWrapper />}></Route>
          <Route path={"/order-placed"} element={<ThankYouPage />}></Route>
          <Route path={"/letter"} element={<PersonalisedLetterForm />}></Route>
          {/* to view order placed */}
          <Route path={"/orders"} element={<Orders />}></Route>
          <Route path={"/"} element={<HomePage />}></Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default AppRouter;
