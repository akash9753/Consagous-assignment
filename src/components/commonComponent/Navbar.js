import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            Airline
          </a>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            {token ? (
              <div>
                <button
                  onClick={() => {
                    Logout();
                  }}
                  class="btn btn-outline-success"
                  type="submit"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => navigate("/login")}
                  class="btn btn-outline-success"
                  type="submit"
                  style={{ marginRight: 4 }}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/Signup")}
                  class="btn btn-outline-success"
                  type="submit"
                >
                  Signup
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
