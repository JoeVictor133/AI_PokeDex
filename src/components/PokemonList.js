import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 27;

  useEffect(() => {
    axios.get('http://localhost:5000/api/pokemon')
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => console.error('Error fetching Pokémon:', error));
  }, []);

  // Calculate the number of pages
  const totalPages = Math.ceil(pokemon.length / itemsPerPage);

  // Get the Pokémon for the current page
  const currentPokemon = pokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div>
      <h1>Pokédex</h1>
      <ul>
        {currentPokemon.map((poke) => (
          <li key={poke.id}>
            <img src={poke.imageUrl} alt={poke.name} />
            <h3 style={{ color: '#0071e3' }}>{poke.name}</h3>
            <p className="pokemon-description">{poke.description}</p>
            <Link to={`/pokemon/${poke.id}`} className="button">View Details</Link>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handleFirstPage} disabled={currentPage === 1}>
          First
        </button>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        <button onClick={handleLastPage} disabled={currentPage === totalPages}>
          Last
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
