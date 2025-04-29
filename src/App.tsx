// App.tsx
import React, { useEffect, useState } from 'react';
import './App.css';

interface Pokemon {
  name: string;
  image: string;
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const getRandomPokemon = async () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
    const data = await response.json();

    setPokemon({
      name: data.name,
      image: data.sprites.other['official-artwork'].front_default,
    });
    setGuess('');
    setMessage('');
  };

  useEffect(() => {
    getRandomPokemon();
  }, []);

  const handleGuess = () => {
    if (!pokemon) return;
    if (guess.trim().toLowerCase() === pokemon.name.toLowerCase()) {
      setMessage('¡Correcto! 🎉');
    } else {
      setMessage('Incorrecto 😔');
    }
  };

  return (
    <div className="App">
      <h1>¿Quién es ese Pokémon?</h1>
      {pokemon && (
        <div className="pokemon-container">
          <img 
            src={pokemon.image} 
            alt="Pokémon" 
            className="pokemon-image"
          />
        </div>
      )}
      <input 
        type="text" 
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Escribe el nombre..."
      />
      <div className="buttons">
        <button onClick={handleGuess}>Adivinar</button>
        <button onClick={getRandomPokemon}>Nuevo Pokémon</button>
      </div>
      {message && <h2>{message}</h2>}
    </div>
  );
}

export default App;
