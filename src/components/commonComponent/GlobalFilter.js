import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
const GlobalFilter = ({ filter, setFilter }) => {
return (
    <div className="App">
      <span>
        Global Search:{" "}
        <input style={{marginLeft: 4}} 
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
        </span>
    </div>
  );
};

export default GlobalFilter;