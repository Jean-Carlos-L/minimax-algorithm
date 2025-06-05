import calculateDamage from './damage.js';
import { chooseBestMove } from './minimax.js';
import readline from 'readline';

// Esta función permite que el usuario elija manualmente un ataque
function chooseManualMove(pokemon) {
  return new Promise((resolve) => {
    console.log(`\n🔹 ${pokemon.name}'s available moves:`);
    pokemon.attacks.forEach((move, index) => {
      console.log(`${index + 1}. ${move.name} (Power: ${move.power})`);
    });

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Choose a move by number: ', (input) => {
      const choice = parseInt(input);
      rl.close();

      if (!isNaN(choice) && choice >= 1 && choice <= pokemon.attacks.length) {
        resolve(pokemon.attacks[choice - 1]);
      } else {
        console.log('❌ Invalid choice. Please select a valid number.');
        resolve(chooseManualMove(pokemon)); // Reintenta si la elección es inválida
      }
    });
  });
}

// Esta función ejecuta un turno de batalla entre dos entrenadores
function battleTurn(attackerTrainer, defenderTrainer, attack) {
  const attacker = attackerTrainer.getActivePokemon();
  const defender = defenderTrainer.getActivePokemon();

  const damage = calculateDamage(attacker, defender, attack);
  defender.receiveDamage(damage);

  console.log(`${attacker.name} used ${attack.name} and dealt ${damage} damage to ${defender.name}`);
  console.log(`${defender.name}'s remaining HP: ${defender.currentHP}\n`);
}

// Esta función controla el ciclo completo de la batalla
async function battle(trainer1, trainer2, mode = 'cpu-vs-cpu') {
  console.log(`\n⚔️ Battle begins between ${trainer1.name} and ${trainer2.name}!\n`);

  while (trainer1.hasRemainingPokemon() && trainer2.hasRemainingPokemon()) {
    const p1 = trainer1.getActivePokemon();
    const p2 = trainer2.getActivePokemon();

    const move1 = (mode === 'user-vs-cpu') ? await chooseManualMove(p1) : chooseBestMove(trainer1, trainer2);
    const move2 = chooseBestMove(trainer2, trainer1);

    let first, second;
    if (p1.speed >= p2.speed) {
      first = { trainer: trainer1, attack: move1 };
      second = { trainer: trainer2, attack: move2 };
    } else {
      first = { trainer: trainer2, attack: move2 };
      second = { trainer: trainer1, attack: move1 };
    }

    battleTurn(first.trainer, second.trainer, first.attack);

    if (second.trainer.hasRemainingPokemon()) {
      battleTurn(second.trainer, first.trainer, second.attack);
    }
  }

  if (trainer1.hasRemainingPokemon()) {
    console.log(`🎉 ${trainer1.name} wins the battle!\n`);
  } else {
    console.log(`🎉 ${trainer2.name} wins the battle!\n`);
  }
}

export { battleTurn, battle };
