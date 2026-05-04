import React from "react";
import logo from "../assets/logo.jpg";

function Logo({ width = "100px" }) {
  return (
    <img src={logo} alt="Logo" style={{ width }} className="object-contain" />
  );
}

export default Logo;
