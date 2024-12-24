import React from 'react';
import { Link } from 'react-router-dom';

const PokemonEvolutionChain = ({ evolutionChain }) => {
    return (
        <div className="evolution-container">
            {evolutionChain.map((stage) => (
                <div key={stage.id} className="pokemon-stage">
                    {/* Main Evolution */}
                    <Link to={`/pokemon/${stage.id}`} style={{ textAlign: 'center' }}>
                        <img src={stage.imageUrl} alt={stage.name} className="pokemon-image" />
                        <p>{stage.name}</p>
                    </Link>

                    {/* Branch Evolutions displayed to the right */}
                    {stage.branches && (
                        <div className="branch-container">
                            {stage.branches.map((branch) => (
                                <div key={branch.id} className="branch">
                                    <Link to={`/pokemon/${branch.id}`} style={{ textAlign: 'center' }}>
                                        <img src={branch.imageUrl} alt={branch.name} className="pokemon-image" />
                                        <p>{branch.name}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PokemonEvolutionChain;
