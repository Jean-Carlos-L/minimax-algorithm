import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import pokedex from "../data/pokedex";
import PokemonCard from "../components/PokemonCard";
import PokemonPreview from "../components/PokemonPreview";

function ListPokemons() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchPokemon, setSearchPokemon] = useState("");
  const [pokemonPlayer1, setPokemonPlayer1] = useState(null);
  const [pokemonPlayer2, setPokemonPlayer2] = useState(null);

  const selectedPokemons = () => {
    const mode = searchParams.get("mode");

    if (mode === "cpu") {
      const randomPokemon1 =
        pokedex[Math.floor(Math.random() * pokedex.length)];
      const randomPokemon2 =
        pokedex[Math.floor(Math.random() * pokedex.length)];
      setPokemonPlayer1(randomPokemon1);
      setPokemonPlayer2(randomPokemon2);
    }

    if (mode === "human") {
      const randomPokemon2 =
        pokedex[Math.floor(Math.random() * pokedex.length)];
      setPokemonPlayer2(randomPokemon2);
    }
  };

  const handleStartBattle = () => {
    localStorage.setItem("pokemonPlayer1", JSON.stringify(pokemonPlayer1));
    localStorage.setItem("pokemonPlayer2", JSON.stringify(pokemonPlayer2));
    // Redirigir a la página de batalla
    navigate("/battle?mode=" + searchParams.get("mode"));
  };

  useEffect(() => {
    selectedPokemons();
  }, [searchParams]);

  const handleSelect = (pokemon) => {
    if (searchParams.get("mode") === "human") setPokemonPlayer1(pokemon);
  };

  const mode = searchParams.get("mode");

  const filteredPokedex = (pokedex) => {
    if (!searchPokemon) return pokedex;

    return pokedex.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchPokemon.toLowerCase())
    );
  };

  return (
    <main className="flex items-start justify-center gap-6 min-h-screen bg-gray-100 px-4 py-10">
      <div className="w-1/5 sticky top-10 self-start">
        {pokemonPlayer1 && (
          <PokemonPreview
            title={mode === "cpu" ? "CPU" : "Jugador"}
            pokemon={pokemonPlayer1}
          />
        )}
      </div>

      <div className="flex-1 ">
        <div>
          <input
            type="text"
            placeholder="Buscar Pokémon..."
            className="mb-4 p-2 border rounded w-full"
            onChange={(e) => setSearchPokemon(e.target.value)}
            value={searchPokemon}
          />
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPokedex(pokedex).map((pokemon) => (
            <PokemonCard
              key={pokemon.id}
              pokemon={pokemon}
              onClick={handleSelect}
            />
          ))}
        </div>
      </div>

      <div className="w-1/5 sticky top-10 self-start">
        {pokemonPlayer2 && (
          <PokemonPreview title="CPU" pokemon={pokemonPlayer2} />
        )}
      </div>

      {pokemonPlayer1 && pokemonPlayer2 && (
        <button
          onClick={handleStartBattle}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl shadow-lg font-semibold z-50 animate-bounce cursor-pointer w-lg"
        >
          Empezar Batalla
        </button>
      )}
    </main>
  );
}

export default ListPokemons;
