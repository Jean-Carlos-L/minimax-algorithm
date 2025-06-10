function PokemonPreview({ title, pokemon }) {
  if (!pokemon) return null;

  return (
    <div className="bg-white shadow-xl rounded-2xl p-4 text-center animate-fade-in-fast">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-24 h-24 mx-auto mb-2"
      />
      <h3 className="text-lg font-semibold capitalize">{pokemon.name}</h3>
      <div className="flex justify-center gap-2 mt-1">
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
          {pokemon.type1}
        </span>
        {pokemon.type2 && (
          <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm">
            {pokemon.type2}
          </span>
        )}
      </div>
      <div className="mt-3 text-sm text-gray-600">
        <p>HP: {pokemon.stats.hp}</p>
        <p>Attack: {pokemon.stats.attack}</p>
      </div>
    </div>
  );
}

export default PokemonPreview;
