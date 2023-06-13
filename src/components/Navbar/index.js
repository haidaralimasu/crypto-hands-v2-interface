import React from "react";
import WalletConnectButton from "../WalletConnectButton";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-light">
        <div class="container-fluid">
          <Link to="/" class="navbar-brand">
            RockPaperScissors
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls="navbarScroll"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
              <li class="nav-item">
                <Link to="/" class="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/cabinet" class="nav-link active" aria-current="page">
                  Cabinet
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/mint" class="nav-link active" aria-current="page">
                  Mint
                </Link>
              </li>
            </ul>
            <div class="d-flex">
              <WalletConnectButton />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
