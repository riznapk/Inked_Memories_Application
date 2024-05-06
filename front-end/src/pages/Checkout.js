import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import "../styles/Checkout.css";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Checkout() {
  //initialisation
  const dispatch = useDispatch();
  const cart = useSelector((state) => state?.cart?.cart);
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <>
      <Header />
      <div className="checkout">
        <div>
          <img
            className="checkout-ad"
            src="https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80"
            alt="Home Kitchen"
            style={{ width: "1400px", height: "500px" }}
          />
          {cart.length === 0 ? (
            <div>
              <h2>Your Cart is empty</h2>
              <p>
                You have no items in your cart. To buy one or more items,
                navigate to <Link to="/">home</Link> to see view the design
                options made available for you.
              </p>
            </div>
          ) : (
            <div>
              <h2 className="checkout-title">Your Shopping Cart</h2>
              {cart?.map((item) => (
                <CheckoutProduct
                  key={item?.cartID}
                  cartID={item?.cartID}
                  message={item?.message}
                  scheduledDate={item?.scheduledDate}
                  designImageURI={item?.designImageURI}
                  designFont={item?.designFont}
                  address={item?.address}
                  designPrice={item?.designPrice}
                  orderType={item?.orderType}
                  isUpdate={isUpdate}
                  setIsUpdate={setIsUpdate}
                  //letter
                  letter={item?.letter}
                  isLetterIncluded={item?.isLetterIncluded}
                />
              ))}
            </div>
          )}
        </div>
        {cart.length > 0 && (
          <div className="subtotal-right">
            <Subtotal />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
