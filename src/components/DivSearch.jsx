import React from 'react';

const DivSearch = ({ placeholder, handleChange, value, handleSearchSubmit }) => {
  return (
    <form className="form-inline d-flex m-3" onSubmit={handleSearchSubmit}>
      <input
        className="form-control mr-sm-2 ml-auto"
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        onChange={handleChange}
        value={value}
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Buscar
      </button>
    </form>
  );
}

export default DivSearch;

