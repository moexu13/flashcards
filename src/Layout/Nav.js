import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ location, pageName }) => {
  // console.log("location", location);
  // double right arrow &raquo;
  // const urls = location.split("/");
  // const home = (
    // <NavLink key="0" to="/">
    //   <li className="breadcrumb-item active" area-current="page">Home</li>
    // </NavLink>
  // );
  if (location && location.length > 0) {
    return (
      <nav aria-label="breadcrumb" className="nav">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
          <li className="breadcrumb-item active" aria-current="page">{pageName}</li>
        </ol>
      </nav>
    );
  } else {
    return null;
  }
  
}

export default Nav;