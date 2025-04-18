import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [speciesFilter, setSpeciesFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const fetchCharacters = async () => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      const data = await response.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching characters:", error);
      setLoading(false);
    }
  };

  const filteredCharacters = characters.filter((character) => {
    const matchesSearch = character.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || character.status.toLowerCase() === statusFilter;
    const matchesSpecies =
      speciesFilter === "all" ||
      character.species.toLowerCase() === speciesFilter;
    return matchesSearch && matchesStatus && matchesSpecies;
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            Rick and Morty
          </h1>
          <div className="mt-6 space-y-4">
            <input
              type="text"
              placeholder="Buscar personaje..."
              className="w-full max-w-md mx-auto block px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex flex-wrap justify-center gap-4">
              <select
                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos los estados</option>
                <option value="alive">Vivo</option>
                <option value="dead">Muerto</option>
                <option value="unknown">Desconocido</option>
              </select>
              <select
                className="px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
                value={speciesFilter}
                onChange={(e) => setSpeciesFilter(e.target.value)}
              >
                <option value="all">Todas las especies</option>
                <option value="human">Humano</option>
                <option value="alien">Alien</option>
                <option value="robot">Robot</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-400"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredCharacters.map((character) => (
                <div
                  key={character.id}
                  className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:transform hover:scale-105 transition-all duration-300 hover:shadow-green-500/20"
                >
                  <div className="relative">
                    <img
                      src={character.image}
                      alt={character.name}
                      className="w-full h-64 object-cover"
                    />
                    <div
                      className="absolute top-2 right-2 px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor:
                          character.status === "Alive"
                            ? "#4CAF50"
                            : character.status === "Dead"
                            ? "#F44336"
                            : "#9E9E9E",
                      }}
                    >
                      {character.status}
                    </div>
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2 text-green-400">
                      {character.name}
                    </h2>
                    <div className="space-y-2">
                      <p className="text-gray-300">
                        <span className="font-semibold">Especie:</span>{" "}
                        {character.species}
                      </p>
                      <p className="text-gray-300">
                        <span className="font-semibold">Ubicación:</span>{" "}
                        {character.location.name}
                      </p>
                      <p className="text-gray-300">
                        <span className="font-semibold">Origen:</span>{" "}
                        {character.origin.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                      page === pageNum
                        ? "bg-green-500 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}
            </div>
          </>
        )}
      </main>

      <footer className="bg-gray-800 py-6 mt-8">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Desarrollado con ❤️ usando React y la API de Rick and Morty</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
