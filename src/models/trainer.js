class Trainer {
  constructor(name, pokemon) {
    this.name = name;
    this.pokemon = pokemon;
  }

  getActivePokemon() {
    return this.pokemon.find(pokemon => !pokemon.isFainted());
  }

  hasRemainingPokemon() {
    return this.pokemon.some(pokemon => !pokemon.isFainted());
  }
}

export { Trainer };