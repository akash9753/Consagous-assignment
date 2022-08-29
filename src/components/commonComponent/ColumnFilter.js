import React from 'react';
const ColumnFilter = ({column}) => {
    const {filterValue, setFilter} = column
    return (
        <div className="App">
      <span>
        Search:{" "}
        <input style={{marginLeft: 4}} 
          value={filterValue || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
        
      </span>
    </div>
    );
};

export default ColumnFilter;