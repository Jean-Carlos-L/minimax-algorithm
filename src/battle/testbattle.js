import { battle } from './engine.js';
import { Trainer } from '../models/trainer.js'; 
import { Pokemon } from '../models/pokemon.js'; 
import { pokedex } from '../data/pokedex.js';
import readline from 'readline';




const randomPokemonUser1 = new Pokemon(pokedex[Math.floor(Math.random() * pokedex.length)]);

const randomPokemonUser2 = new Pokemon(pokedex[Math.floor(Math.random() * pokedex.length)]);

const ash = new Trainer('Ash', [randomPokemonUser1]);
const misty = new Trainer('Misty', [randomPokemonUser2]);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


console.log('Select battle mode:');
console.log('1. User vs Machine');
console.log('2. Machine vs Machine');
rl.question('Enter 1 or 2: ', async (input) => {
  const mode = input === '1' ? 'user-vs-cpu' : 'cpu-vs-cpu';
  rl.close();
  await battle(ash, misty, mode);
});
