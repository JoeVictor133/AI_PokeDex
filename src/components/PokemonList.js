import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PokemonList() {
  const [pokemon, setPokemon] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);
  const itemsPerPage = 27;

  const pokemonTypes = [
    'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison',
    'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dark', 'Dragon',
    'Steel', 'Fairy'
  ];

  useEffect(() => {
    axios.get('http://localhost:5000/api/pokemon')
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => console.error('Error fetching Pokémon:', error));
  }, []);

  const applyFiltersAndSorting = () => {
    let updatedList = [...pokemon];

    if (nameFilter) {
      updatedList = updatedList.filter((poke) =>
        poke.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    if (typeFilter.length > 0) {
      updatedList = updatedList.filter((poke) =>
        typeFilter.every((type) => poke.type.includes(type))
      );
    }

    if (sortBy) {
      updatedList.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.stats[sortBy] - b.stats[sortBy];
        } else {
          return b.stats[sortBy] - a.stats[sortBy];
        }
      });
    }

    return updatedList;
  };


  const filteredAndSortedPokemon = applyFiltersAndSorting();
  const totalPages = Math.ceil(filteredAndSortedPokemon.length / itemsPerPage);
  const currentPokemon = filteredAndSortedPokemon.slice(
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

  const handleTypeCheckboxChange = (type) => {
    setTypeFilter((prevTypes) =>
      prevTypes.includes(type)
        ? prevTypes.filter((t) => t !== type)
        : [...prevTypes, type]
    );
    setCurrentPage(1);
  };

  return (
    <div className="pokedex-container" style={{ width: '90%', margin: 'auto' }}>
      <h1>Pokédex</h1>

      {/* Filter and Sort Controls */}
      <div className="filter-sort" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(e) => {
            setNameFilter(e.target.value);
            setCurrentPage(1);
          }}
          style={{ flex: '1', marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />

        {/* Custom Type Filter Dropdown */}
        <div style={{ position: 'relative', flex: '1', marginRight: '10px' }}>
          <button
            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: '#fff',
              textAlign: 'left',
            }}
          >
            Filter by Type
          </button>
          {isTypeDropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                width: '100%',
                maxHeight: '200px',
                overflowY: 'auto',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '4px',
                zIndex: 10,
                padding: '10px'
              }}
            >
              {pokemonTypes.map((type) => (
                <label key={type} style={{ display: 'block', marginBottom: '5px' }}>
                  <input
                    type="checkbox"
                    checked={typeFilter.includes(type)}
                    onChange={() => handleTypeCheckboxChange(type)}
                  />
                  {type}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Sort by Stats */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{ flex: '1', marginRight: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Sort by Stats</option>
          <option value="hp">HP</option>
          <option value="attack">Attack</option>
          <option value="defense">Defense</option>
          <option value="specialAttack">Special Attack</option>
          <option value="specialDefense">Special Defense</option>
          <option value="speed">Speed</option>
        </select>

        {/* Sort Order */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ flex: '1', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Pokémon List */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {currentPokemon.map((poke) => (
          <div
            key={poke.id}
            style={{
              width: '260px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '15px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
            }}
          >
            <img
              src={poke.imageUrl}
              alt={poke.name}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
            <h3 style={{ color: '#0071e3', marginTop: '10px' }}>{poke.name}</h3>
            <p className="pokemon-description" style={{ fontSize: '14px', color: '#333', height: '60px', overflow: 'hidden' }}>{poke.description}</p>
            <Link to={`/pokemon/${poke.id}`} className="button" style={{
              display: 'inline-block',
              marginTop: '10px',
              padding: '10px 15px',
              backgroundColor: '#ff5722',
              color: '#fff',
              textDecoration: 'none',
              borderRadius: '4px'
            }}>
              View Details
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination" style={{ marginTop: '20px', textAlign: 'center' }}>
        <button onClick={handleFirstPage} disabled={currentPage === 1}>
          First
        </button>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span>
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
