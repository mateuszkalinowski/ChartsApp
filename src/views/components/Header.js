import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <a className="navbar-brand" href="/">
              ChartsApp
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
              {/* <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle active" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Plik
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="#">Nowy</a>
                    <a class="dropdown-item" href="#"></a>
                    <a class="dropdown-item" href="#"></a>
                    </div>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Edycja
                  </a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" href="#">
                    Widok
                  </a>
                </li> */}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
