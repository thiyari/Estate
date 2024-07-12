import React from 'react';
function Header(){

    return(
        <React.Fragment>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <a className="navbar-brand" href="#a">Estate</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#b">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#c">Plots</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#c">Flats</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#c">Commercial</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#d" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            My Account
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#e">Profile</a></li>
            <li><a className="dropdown-item" href="#f">Change Password</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#g">Logout</a></li>
          </ul>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
        </React.Fragment>
    );
}

export default Header;