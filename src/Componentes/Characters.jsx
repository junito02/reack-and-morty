import React, { useState, useEffect } from "react";
import Header from "./Header";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchCharacters = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCharacters(data.results);
      setFilteredCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (error) {
      console.error("Error fetching characters:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  const handleSearch = () => {
    setFilteredCharacters(
      characters.filter((character) =>
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="Characters-container">
      {/* Header con funcionalidad de búsqueda */}
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      {/* Mostrar "Cargando" mientras se cargan los datos */}
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <h2 className="text-white text-2xl font-bold">Cargando...</h2>
        </div>
      ) : (
        <>
          {/* Paginación arriba */}
          <div className="flex justify-center gap-4 py-4 bg-transparent border-b-2 border-indigo-600">
            <button
              onClick={handlePreviousPage}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-white text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>

          {/* Grid de personajes */}
          <div className="Characters grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 justify-items-center">
            {filteredCharacters.map((character) => (
              <div
                key={character.id}
                className="bg-gradient-to-t from-indigo-900 to-slate-700 rounded-lg border-4 border-indigo-600 shadow-lg w-full max-w-xs p-4 flex flex-col items-center text-center"
              >
                <img
                  src={character.image}
                  alt={character.name}
                  className="h-40 w-40 object-cover rounded-full mb-4 border-4 border-indigo-600"
                />
                <h2 className="text-xl font-bold text-white mb-2">
                  {character.name}
                </h2>
                <hr className="w-full mb-3 border-indigo-400" />
                <div className="text-sm text-white space-y-1">
                  <p>
                    <span className="font-medium">Species:</span>{" "}
                    {character.species}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    {character.status}
                  </p>
                  <p>
                    <span className="font-medium">Gender:</span>{" "}
                    {character.gender}
                  </p>
                  <p>
                    <span className="font-medium">Origin:</span>{" "}
                    {character.origin.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Paginación debajo de los personajes */}
          <div className="flex justify-center gap-4 py-4 bg-transparent border-t-2 border-indigo-600">
            <button
              onClick={handlePreviousPage}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md"
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-white text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Characters;
