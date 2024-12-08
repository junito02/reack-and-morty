import React from "react";
import banner from "../assets/banner-op.jpg";

const Header = ({ searchTerm, setSearchTerm, onSearch }) => {
  return (
    <div className="Header relative">
      {/* Imagen de banner */}
      <img
        className="w-full h-[200px] object-cover"
        src={banner}
        alt="banner"
      />

      {/* Input de búsqueda con botón */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Search for a character..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg shadow-md text-black"
        />
        <button
          onClick={onSearch}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
