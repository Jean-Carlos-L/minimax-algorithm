import { cpuVsCpuBattle, userVsCpuTurn } from './engine.js';
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
  if (mode === 'user-vs-cpu') {
  console.log(`\n⚔️ Battle begins between ${ash.name} and ${misty.name}!\n`);

  let result;
  do {
    result = await userVsCpuTurn(ash, misty);

    console.log(`\n🔄 Turn result:`);
    console.log(`➡️  ${result.userPokemon} used ${result.userAttack} (Damage: ${result.userDamage})`);
    console.log(`🤖 ${result.cpuPokemon} used ${result.cpuAttack} (Damage: ${result.cpuDamage})`);
    console.log(`❤️ ${result.userPokemon} HP: ${result.userHP}`);
    console.log(`💙 ${result.cpuPokemon} HP: ${result.cpuHP}`);

    if (result.winner) {
      console.log(`\n🏆 Winner: ${result.winner}`);
    }

  } while (!result.winner);
}
   else {
  const { movesLog, winner } = await cpuVsCpuBattle(ash, misty);

  console.log('\n📜 Battle Log:');
  movesLog.forEach((entry, index) => {
    console.log(`${index + 1}. ${entry}`);
  });

  console.log(`\n🏁 Battle Over!`);
  console.log(`🏆 Winner: ${winner}`);
}
});
