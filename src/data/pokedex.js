const pokedex = [
  {
    id: 1,
    name: "Bulbasaur",
    type1: "Grass",
    type2: "Poison",
    stats: {
      hp: 45,
      attack: 49,
      defense: 49,
      spAtk: 65,
      spDef: 65,
      speed: 45,
    },
    attacks: [
      { name: "Tackle", type: "Normal", power: 40 },
      { name: "Vine Whip", type: "Grass", power: 45 },
      { name: "Razor Leaf", type: "Grass", power: 55 },
      { name: "Sludge Bomb", type: "Poison", power: 90 }
    ],
  },
  {
    id: 4,
    name: "Charmander",
    type1: "Fire",
    type2: null,
    stats: {
      hp: 39,
      attack: 52,
      defense: 43,
      spAtk: 60,
      spDef: 50,
      speed: 65,
    },
    attacks: [
      { name: "Scratch", type: "Normal", power: 40 },
      { name: "Ember", type: "Fire", power: 40 },
      { name: "Flamethrower", type: "Fire", power: 90 },
      { name: "Dragon Rage", type: "Dragon", power: 0 } // Usa daño fijo en el juego, puedes decidir manejarlo como 60
    ],
  },
  {
    id: 7,
    name: "Squirtle",
    type1: "Water",
    type2: null,
    stats: {
      hp: 44,
      attack: 48,
      defense: 65,
      spAtk: 50,
      spDef: 64,
      speed: 43,
    },
    attacks: [
      { name: "Tackle", type: "Normal", power: 40 },
      { name: "Water Gun", type: "Water", power: 40 },
      { name: "Bite", type: "Dark", power: 60 },
      { name: "Bubble", type: "Water", power: 40 }
    ],
  },
];

export default pokedex;