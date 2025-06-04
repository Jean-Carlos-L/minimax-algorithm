// models/Trainer.js

class Trainer {
  constructor(name, pokemon) {
    this.name = name;        
    this.pokemon = pokemon;   // Primero vamos a que solo tiene un Pokémon
  }

  getActivePokemon() {
    return this.pokemon;
  }

  hasRemainingPokemon() {
    return !this.pokemon.isFainted();
  }
}

module.exports = Trainer;
