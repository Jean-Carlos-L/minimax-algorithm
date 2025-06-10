import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-700 text-white px-4">
      <h1 className="text-4xl font-bold mb-10 text-center">
        Elige tu modo de juego
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <div
          onClick={() => navigate("/pokemons?mode=human")}
          className="cursor-pointer bg-white text-indigo-700 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 p-8 text-center"
        >
          <h2 className="text-2xl font-semibold mb-2">🧑‍🤝‍🧑 Humanos vs CPU</h2>
          <p className="text-gray-600">
            Compite tú mismo contra una inteligencia artificial.
          </p>
        </div>

        <div
          onClick={() => navigate("/pokemons?mode=cpu")}
          className="cursor-pointer bg-white text-indigo-700 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 p-8 text-center"
        >
          <h2 className="text-2xl font-semibold mb-2">🤖 CPU vs CPU</h2>
          <p className="text-gray-600">
            Observa cómo dos inteligencias artificiales se enfrentan.
          </p>
        </div>
      </div>
    </main>
  );
}
export default LandingPage;
