const pokedex = require('./data/pokedex');

// Por ejemplo, buscar Bulbasaur:
const bulbasaur = pokedex.find(p => p.name === 'Bulbasaur');
console.log(bulbasaur);