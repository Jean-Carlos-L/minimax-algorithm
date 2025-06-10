import React, { useState } from "react";
import { motion } from "framer-motion";

const PokemonCard = ({ pokemon, onClick }) => {
  const [flipped, setFlipped] = useState(false);
  const {
    id,
    name,
    type1,
    type2,
    stats,
    attacks,
    image,
  } = pokemon;

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent the click from propagating to the parent div
    onClick(pokemon);
  }

  return (
   <div className="w-full max-w-2xl mx-auto perspective" onClick={() => setFlipped(!flipped)}>
      <motion.div
        className={`relative  h-[450px] w-[300px] transition-transform duration-400 preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-extrabold text-gray-800">{name}</h2>
            <span className="text-sm text-gray-400 font-semibold"># {id}</span>
          </div>

          <div className="flex justify-center mb-4">
            <img src={image} alt={name} className="h-36 w-36 object-contain drop-shadow-md" />
          </div>

          <div className="flex justify-center gap-2 mb-4">
            <span className="px-4 py-1 rounded-full text-white text-xs font-bold uppercase bg-green-500 shadow-md">
              {type1}
            </span>
            {type2 && (
              <span className="px-4 py-1 rounded-full text-white text-xs font-bold uppercase bg-purple-500 shadow-md">
                {type2}
              </span>
            )}
          </div>

          <h3 className="text-sm font-bold text-gray-700 mb-1 uppercase">Stats</h3>
          <ul className="grid grid-cols-2 gap-x-4 text-sm text-gray-600 font-mono">
            {Object.entries(stats).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span className="capitalize">{key}</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={handleClick}
            className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer shadow-md"
          >
            Seleccionar
            </button>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-100 rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Attacks</h3>
          <ul className="space-y-3 text-sm text-gray-700">
            {attacks.map((atk, i) => (
              <li
                key={i}
                className="flex justify-between items-center bg-white px-4 py-2 rounded-md shadow"
              >
                <div>
                  <span className="font-semibold">{atk.name}</span>
                  <span className="ml-2 text-xs text-white bg-gray-500 px-2 py-0.5 rounded-full">
                    {atk.type}
                  </span>
                </div>
                <span>{atk.power}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-gray-500 mt-6 text-center">Haz clic para volver</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PokemonCard;
