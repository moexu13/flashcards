import React, {Fragment } from "react";
import Header from "./Header";
import Home from "../root";

// import "../sass/style.scss";

function Layout() {
  return (
    <Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
          <Home />
      </div>
    </Fragment>
  );
}

export default Layout;
