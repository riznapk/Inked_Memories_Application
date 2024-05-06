import React, { useEffect, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../styles/Header.css";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearUserInfo } from "../redux/userDetailsReducer";
import logo from "../assets/images/logo.png";
import { clearCartInfo } from "../redux/cartReducer";
import { clearDesignInfo } from "../redux/designListReducer";
import { clearOrderInfo } from "../redux/orderReducer";

const Header = () => {
  //initiialisation
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  //to perform cart highlight transition
  const [isCartUpdated, setIsCartUpdated] = useState(false);

  //to obtain the cart data
  const cart = useSelector((state) => state?.cart?.cart);

  const handleLogout = () => {
    // Handle logout functionality here
    navigate("/signin");
    dispatch(clearUserInfo());
    dispatch(clearCartInfo());
    dispatch(clearDesignInfo());
    dispatch(clearOrderInfo());
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  //to check the cart updations
  useEffect(() => {
    if (cart?.length != 0) setIsCartUpdated(true);
  }, [cart?.length]);

  return (
    <nav className="header">
      <>
        <Link to="/" className="no-link">
          <span>
            <img src={logo} alt="logo" style={{ width: "50px" }} />
          </span>
        </Link>

        <div className="header-nav">
          <div className="header-tabs">
            <div className="header-tab-container">
              <Link to="/designs" className="header-tab">
                Designs
              </Link>
            </div>
          </div>
          {user?.userProfile == "customer" && (
            <div className="header-tabs">
              <div className="header-tab-container">
                <Link to="/personalised" className="header-tab">
                  Personalised Designs
                </Link>
              </div>
            </div>
          )}
          <div className="header-tabs">
            <div className="header-tab-container">
              <Link to="/orders" className="header-tab">
                Orders
              </Link>
            </div>
          </div>

          {user?.userProfile == "customer" && (
            <div className={`header-user ${isCartUpdated ? "highlight" : ""}`}>
              <Link to="/mycart" className="header-tab">
                <ShoppingCartRoundedIcon />
              </Link>
              {cart?.length}
            </div>
          )}
          {user?.userProfile == "admin" && (
            <div className="header-tabs">
              <div className="header-tab-container">
                <Link to="/designupload" className="header-tab">
                  Design Upload
                </Link>
              </div>
            </div>
          )}
          <div className="header-user">
            <Link className="header-user" onClick={toggleDropdown}>
              <AccountCircleIcon fontSize="large" />
            </Link>
            {showDropdown && (
              <div className="dropdown">
                <Button onClick={handleLogout}>Logout</Button>
              </div>
            )}
          </div>
        </div>
      </>
    </nav>
  );
};

export default Header;
