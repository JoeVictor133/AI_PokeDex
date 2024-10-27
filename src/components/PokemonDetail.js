import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PokemonEvolutionChain from './PokemonEvolutionChain';

function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/pokemon/${id}`)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => console.error('Error fetching Pokémon details:', error));
  }, [id]);

  if (!pokemon) return <div>Loading...</div>;

  return (
    <div className="pokemon-detail-container">
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2 style={{ fontSize: '2em', color: '#333' }}>{pokemon.name}</h2>
        <img
          src={pokemon.imageUrl}
          alt={pokemon.name}
          className="pokemon-detail-image"
        />

        <p><strong>Type:</strong> {pokemon.type.join(', ')}</p>
        <p style={{ maxWidth: '500px', margin: 'auto', color: '#666' }}>{pokemon.description}</p>

        <h3 style={{ marginTop: '20px', color: '#e3350d' }}>Lore</h3>
        <p style={{ maxWidth: '500px', margin: 'auto', color: '#666' }}>{pokemon.lore}</p>

        <h3 style={{ marginTop: '20px', color: '#e3350d' }}>Behavior</h3>
        <p style={{ maxWidth: '500px', margin: 'auto', color: '#666' }}>{pokemon.behavior}</p>

        <h3 style={{ marginTop: '20px', color: '#e3350d' }}>Habitat</h3>
        <p style={{ maxWidth: '500px', margin: 'auto', color: '#666' }}>{pokemon.habitat}</p>

        {pokemon.stats && (
          <>
            <h3 style={{ marginTop: '20px', color: '#e3350d' }}>Stats</h3>
            <p><strong>HP:</strong> {pokemon.stats.hp}</p>
            <p><strong>Attack:</strong> {pokemon.stats.attack}</p>
            <p><strong>Defense:</strong> {pokemon.stats.defense}</p>
          </>
        )}

        <h3 style={{ marginTop: '20px', color: '#e3350d' }}>Evolutionary Chain</h3>
        <PokemonEvolutionChain evolutionChain={pokemon.evolutionChain} />

        <div style={{ marginTop: '20px' }}>
          <button className="button" onClick={() => navigate('/')}>Back</button>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
