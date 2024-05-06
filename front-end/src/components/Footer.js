import React from "react";
import { AppBar, Toolbar, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <>
      <footer class="footer-distributed">
        <div class="footer-left">
          <img src={logo} width="50px" />

          <p class="footer-links">
            <Link to="#" class="link-1">
              Home
            </Link>

            <Link to="#">Blog</Link>

            <Link to="#">Pricing</Link>

            <Link to="#">About</Link>

            <Link to="#">Faq</Link>

            <Link to="#">Contact</Link>
          </p>

          <p class="footer-company-name">Inked Memories © 2023</p>
        </div>

        <div class="footer-center">
          <div>
            <i class="fa fa-map-marker"></i>
            <p>
              <span>123 Oxford Street</span> London, United Kingdom
            </p>
          </div>

          <div>
            <i class="fa fa-phone"></i>
            <p>+44 77 777 7777</p>
          </div>

          <div>
            <i class="fa fa-envelope"></i>
            <p>
              <a href="mailto:support@inkedmemories.com">
                support@inkedmemories.com
              </a>
            </p>
          </div>
        </div>

        <div class="footer-right">
          <p class="footer-company-about">
            <span>About the company</span>
            Lorem ipsum dolor sit amet, consectateur adispicing elit. Fusce
            euismod convallis velit, eu auctor lacus vehicula sit amet.
          </p>

          <div class="footer-icons">
            <Link to="#">
              <i class="fa fa-facebook"></i>
            </Link>
            <Link to="#">
              <i class="fa fa-twitter"></i>
            </Link>
            <Link to="#">
              <i class="fa fa-linkedin"></i>
            </Link>
            <Link to="#">
              <i class="fa fa-github"></i>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
