import React from 'react';
import { SlHome } from "react-icons/sl";

function Header(){

    return(
        <React.Fragment>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/"><SlHome /></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link"  href="#c">Plots</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#c">Flats</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#c">Commercial</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#s">Search</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="../Register">Register</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#c">Contact Us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#a">About Us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="../Login">Login</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </React.Fragment>
    );
}

export default Header;