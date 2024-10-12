import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=100')
      .then(response => {
        const results = response.data.results;
        const fetchDetails = results.map(pokemon => axios.get(pokemon.url));
        Promise.all(fetchDetails).then(details => {
          const data = details.map(detail => detail.data);
          setPokemonList(data);
        });
      })
      .catch(error => console.log(error));
  }, []);

  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Pokémon Search</h1>
      
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map((pokemon) => (
          <div key={pokemon.id} className="bg-white rounded-lg shadow-lg p-4 text-center hover:scale-105 transform transition-transform duration-200">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-20 h-20 mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold text-gray-800 capitalize">
              {pokemon.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
