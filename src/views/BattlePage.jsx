import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function BattlePage() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  const [pokemonPlayer1, setPokemonPlayer1] = useState(
    JSON.parse(localStorage.getItem("pokemonPlayer1"))
  );
  const [pokemonPlayer2, setPokemonPlayer2] = useState(
    JSON.parse(localStorage.getItem("pokemonPlayer2"))
  );

  const [hp1, setHp1] = useState(pokemonPlayer1.stats.hp);
  const [hp2, setHp2] = useState(pokemonPlayer2.stats.hp);

  // Lógica básica para atacar
  const handleAttack = (power) => {
    const damage = power || 10;
    setHp2((prev) => Math.max(prev - damage, 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">¡Batalla Pokémon!</h1>

      <div className="flex justify-between items-center w-full max-w-6xl gap-8">
        {/* Jugador 1 */}
        <div className="flex flex-col items-center w-1/2 bg-white rounded-xl shadow-xl p-6 relative">
          <h2 className="text-xl font-semibold mb-2">
            {mode === "human" ? "Jugador" : "CPU 1"}
          </h2>

          <img
            src={pokemonPlayer1.image}
            alt={pokemonPlayer1.name}
            className="w-40 h-40"
          />

          {/* Nombre */}
          <p className="text-lg font-bold mt-2 capitalize">
            {pokemonPlayer1.name}
          </p>

          {/* Tipos */}
          <div className="flex gap-2 mt-1">
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-gray-200">
              {pokemonPlayer1?.type1}
            </span>
            {pokemonPlayer1?.type2 && (
              <span className="text-sm font-medium px-2 py-1 rounded-full bg-gray-200">
                {pokemonPlayer1?.type2}
              </span>
            )}
          </div>

          {/* Barra de vida */}
          <div className="w-full bg-gray-300 rounded-full h-5 mt-2">
            <div
              className="bg-red-500 h-5 rounded-full transition-all duration-300"
              style={{ width: `${(hp1 / pokemonPlayer1.stats.hp) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Jugador 2 */}
        <div className="flex flex-col items-center w-1/2 bg-white rounded-xl shadow-xl p-6 relative">
          <h2 className="text-xl font-semibold mb-2">
            {mode === "human" ? "CPU" : "CPU 2"}
          </h2>

          <img
            src={pokemonPlayer2.image}
            alt={pokemonPlayer2.name}
            className="w-40 h-40"
          />

          {/* Nombre */}
          <p className="text-lg font-bold mt-2 capitalize">
            {pokemonPlayer2.name}
          </p>

          {/* Tipos */}
          <div className="flex gap-2 mt-1">
            <span className="text-sm font-medium px-2 py-1 rounded-full bg-gray-200">
              {pokemonPlayer2?.type1}
            </span>
            {pokemonPlayer2?.type2 && (
              <span className="text-sm font-medium px-2 py-1 rounded-full bg-gray-200">
                {pokemonPlayer2?.type2}
              </span>
            )}
          </div>

          {/* Barra de vida */}
          <div className="w-full bg-gray-300 rounded-full h-5 mt-2">
            <div
              className="bg-red-500 h-5 rounded-full transition-all duration-300"
              style={{ width: `${(hp1 / pokemonPlayer1.stats.hp) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Ataques del jugador */}
      {mode === "human" && (
        <div className="mt-8 w-full max-w-4xl">
          <h3 className="text-xl font-bold mb-4">Selecciona un ataque</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {pokemonPlayer1.attacks.map((atk, i) => (
              <button
                key={i}
                onClick={() => handleAttack(atk.power)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                {atk.name} <br />
                <span className="text-sm font-normal">
                  ({atk.type} / {atk.power})
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default BattlePage;
