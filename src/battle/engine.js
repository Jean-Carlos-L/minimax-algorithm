import calculateDamage from "./damage.js";
import { chooseBestMove } from "./minimax.js";
import readline from "readline";

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

    rl.question("Choose a move by number: ", (input) => {
      const choice = parseInt(input);
      rl.close();

      if (!isNaN(choice) && choice >= 1 && choice <= pokemon.attacks.length) {
        resolve(pokemon.attacks[choice - 1]);
      } else {
        console.log("❌ Invalid choice. Please select a valid number.");
        resolve(chooseManualMove(pokemon)); // Reintenta si la elección es inválida
      }
    });
  });
}

function battleTurn(attackerTrainer, defenderTrainer, attack) {
  const attacker = attackerTrainer.getActivePokemon();
  const defender = defenderTrainer.getActivePokemon();

  const damage = calculateDamage(attacker, defender, attack);
  defender.receiveDamage(damage);
  return damage;
}

function cpuVsCpuBattle(cpu1, cpu2) {
  console.log(`\n🤖 CPU Battle between ${cpu1.name} and ${cpu2.name}!\n`);

  const movesLog = [];

  while (cpu1.hasRemainingPokemon() && cpu2.hasRemainingPokemon()) {
    const p1 = cpu1.getActivePokemon();
    const p2 = cpu2.getActivePokemon();

    const move1 = chooseBestMove(cpu1, cpu2);
    const move2 = chooseBestMove(cpu2, cpu1);

    let first, second;
    if (p1.speed >= p2.speed) {
      first = { trainer: cpu1, attack: move1 };
      second = { trainer: cpu2, attack: move2 };
    } else {
      first = { trainer: cpu2, attack: move2 };
      second = { trainer: cpu1, attack: move1 };
    }

    const damage1 = battleTurn(first.trainer, second.trainer, first.attack);
    movesLog.push(
      `${first.trainer.name} used ${first.attack.name} (Damage: ${damage1})`
    );

    let damage2 = 0;
    if (second.trainer.hasRemainingPokemon()) {
      damage2 = battleTurn(second.trainer, first.trainer, second.attack);
      movesLog.push(
        `${second.trainer.name} used ${second.attack.name} (Damage: ${damage2})`
      );
    }

    movesLog.push(
      `🔸 Round Summary: ${first.trainer.name} did ${damage1}, ${second.trainer.name} did ${damage2}`
    );
  }

  const winner = cpu1.hasRemainingPokemon() ? cpu1.name : cpu2.name;
  movesLog.push(`🏆 ${winner} wins!`);

  return {
    winner,
    movesLog,
  };
}
async function userVsCpuTurn(user, cpu) {
  const userPkmn = user.getActivePokemon();
  const cpuPkmn = cpu.getActivePokemon();

  const userMove = await chooseManualMove(userPkmn);
  const cpuMove = chooseBestMove(cpu, user);

  let first, second;
  if (userPkmn.speed >= cpuPkmn.speed) {
    first = { trainer: user, attack: userMove };
    second = { trainer: cpu, attack: cpuMove };
  } else {
    first = { trainer: cpu, attack: cpuMove };
    second = { trainer: user, attack: userMove };
  }

  const damage1 = battleTurn(first.trainer, second.trainer, first.attack);

  let damage2 = 0;
  if (second.trainer.hasRemainingPokemon()) {
    damage2 = battleTurn(second.trainer, first.trainer, second.attack);
  }

  let winner = null;
  if (!user.hasRemainingPokemon()) winner = cpu.name;
  if (!cpu.hasRemainingPokemon()) winner = user.name;

  return {
    userAttack: userMove.name,
    cpuAttack: cpuMove.name,
    userPokemon: userPkmn.name,
    cpuPokemon: cpuPkmn.name,
    userHP: userPkmn.currentHP,
    cpuHP: cpuPkmn.currentHP,
    userDamage: first.trainer === user ? damage1 : damage2,
    cpuDamage: first.trainer === cpu ? damage1 : damage2,
    winner,
  };
}

export { battleTurn, userVsCpuTurn, cpuVsCpuBattle };
