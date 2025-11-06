import React from 'react';

const DivSearch = ({children, placeholder, handleChange, value, handleSearchSubmit}) => {
  return (
    <form className="w-11/12 sm:w-full max-w-4xl mx-auto" onSubmit={handleSearchSubmit}>
      <div className="flex gap-2 items-center">
        <div className="flex-2 relative">
          <input
            className="w-full px-4 py-2.5 pl-10 bg-white border-2 border-gray-600 text-gray-900 placeholder-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 hover:border-gray-700 transition-colors"
            type="search"
            placeholder={placeholder}
            aria-label="Search"
            onChange={handleChange}
            value={value}
          />
          <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"></i>
        </div>
        <button
          className="px-4 py-3 sm:px-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium whitespace-nowrap flex items-center gap-2"
          type="submit"
        >
          <i className="fa fa-search"></i>
          <span className="hidden sm:inline">Buscar</span>
        </button>
        {children}
      </div>
    </form>
  );
}

export default DivSearch;

