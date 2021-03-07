import React from "react";
import logo from "../images/logo_white.png";

function Header() {
  return (
    <header className="jumbotron header">
      <div className="container text-white">
        <h1 className="display-4">
          <img src={logo} className="header__logo" alt="logo" />  
          Flashcard-o-matic
        </h1>
        <p className="header__lead">Discover The Flashcard Difference.</p>
      </div>
    </header>
  );
}

export default Header;
