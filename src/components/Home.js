import React from "react";

import Navbar from "./commonComponent/Navbar";
const Home = () => {
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1610642372651-fe6e7bc209ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80")',
          height: "100vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
      }}
    >
      <Navbar />
      {/* <img src="https://thumbs.dreamstime.com/b/indigo-flight-ready-to-fly-high-flight-ready-to-fly-ready-to-fly-indigo-flight-ready-to-fly-high-160360189.jpg" /> */}
    </div>
  );
};

export default Home;
