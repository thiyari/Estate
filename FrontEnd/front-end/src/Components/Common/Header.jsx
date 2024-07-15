import React from 'react';
import './common.css'

function Header(){

    return(
        <React.Fragment>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <a className="navbar-brand" href="/"><i className='fa fa-fw fa-home'/></a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
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
          <a className="nav-link" href="#c">Contact us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#a">About us</a>
        </li>
        <li className="nav-item">
        <form class="d-flex" action='../Login'>
            <button id="login" class="btn btn-outline-success" type="submit">Login</button>
        </form>
        </li>
      </ul>
    </div>
  </div>
</nav>
        </React.Fragment>
    );
}

export default Header;