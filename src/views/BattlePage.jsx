import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Trainer } from "../models/trainer";
import { Pokemon } from "../models/pokemon";
import { cpuVsCpuBattle, userVsCpuTurn } from "../battle/engine";

function BattlePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const [currentMove, setCurrentMove] = useState(null);
  const [canUserAttack, setCanUserAttack] = useState(true);

  const [pokemonPlayer1] = useState(
    JSON.parse(localStorage.getItem("pokemonPlayer1"))
  );
  const [pokemonPlayer2] = useState(
    JSON.parse(localStorage.getItem("pokemonPlayer2"))
  );

  const [trainer1] = useState(
    new Trainer(pokemonPlayer1.name, [new Pokemon(pokemonPlayer1)])
  );
  const [trainer2] = useState(
    new Trainer(pokemonPlayer2.name, [new Pokemon(pokemonPlayer2)])
  );

  const [hp1, setHp1] = useState(pokemonPlayer1.stats.hp);
  const [hp2, setHp2] = useState(pokemonPlayer2.stats.hp);

  const startBattle = async (battleLog) => {
    for (let i = 0; i < battleLog.length; i++) {
      const { pokemon: name, damage, move, penalty } = battleLog[i];

      await new Promise((resolve) => {
        setTimeout(() => {
          setCurrentMove(`${name} used ${move} and dealt ${damage} damage!`);
          if (name === pokemonPlayer1.name) {
            setHp2((prevHp) => Math.max(prevHp - damage, 0));
            setHp1((prevHp) => Math.max(prevHp - penalty, 0));
          } else if (name === pokemonPlayer2.name) {
            setHp1((prevHp) => Math.max(prevHp - damage, 0));
            setHp2((prevHp) => Math.max(prevHp - penalty, 0));
          }
          resolve();
        }, 3000);
      });
    }
  };

  // Lógica básica para atacar
  const handleAttack = (attack) => {
    if (!canUserAttack) return;
    setCanUserAttack(false);
    const damage = userVsCpuTurn(trainer1, trainer2, attack);

    setHp2((prevHp) =>
      Math.max(prevHp - damage.userDamage, 0)
    );
    setHp1((prevHp) => Math.max(prevHp - damage.userPenalty, 0));
    setCurrentMove(
      `${damage.userPokemon} used ${damage.userAttack} and dealt ${damage.userDamage} damage!`
    );

    setTimeout(() => {
      setHp1((prevHp) => Math.max(prevHp - damage.cpuDamage, 0));
      setHp2((prevHp) => Math.max(prevHp - damage.cpuPenalty, 0));
      setCurrentMove(
        () =>
          `${damage.cpuPokemon} used ${damage.cpuAttack} and dealt ${damage.cpuDamage} damage!`
      );
    }, 1500);

    setTimeout(() => {
      setCanUserAttack(true);
    }, 2500);
  };

  useEffect(() => {
    if (mode === "cpu") {
      const battle = () => {
        const result = cpuVsCpuBattle(trainer1, trainer2);
        startBattle(result.movesLog);
      };

      battle();
    }
  }, [trainer1, trainer2]);

  // Validar si hay un ganador
  if (hp1 <= 0 || hp2 <= 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-200 to-yellow-100 flex flex-col items-center justify-center px-4 py-12 text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-xl w-full animate-fade-in">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            🏆 ¡Batalla Finalizada!
          </h1>

          <p className="text-2xl font-semibold text-green-700 mb-4">
            {hp1 <= 0
              ? `${pokemonPlayer2.name} ha ganado la batalla 🎉`
              : `${pokemonPlayer1.name} ha ganado la batalla 🎉`}
          </p>

          <img
            src={hp1 <= 0 ? pokemonPlayer2.image : pokemonPlayer1.image}
            alt="Ganador"
            className="w-40 h-40 mx-auto mb-6 drop-shadow-lg"
          />

          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition duration-300"
          >
            🔁 Volver a Jugar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">¡Batalla Pokémon!</h1>

      {currentMove && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-md shadow-md text-center mb-6 animate-fade-in">
          <p className="text-lg font-semibold">{currentMove}</p>
        </div>
      )}

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
              style={{ width: `${(hp2 / pokemonPlayer2.stats.hp) * 100}%` }}
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
                onClick={() => handleAttack(atk)}
                disabled={!canUserAttack}
                className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition ${
                  canUserAttack
                    ? "cursor-pointer"
                    : "cursor-not-allowed opacity-50"
                }`}
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
