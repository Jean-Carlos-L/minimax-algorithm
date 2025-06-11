import calculateDamage from "./damage.js";
import { chooseBestMove } from "./minimax.js";

function battleTurn(attackerTrainer, defenderTrainer, attack) {
  if (!attack || typeof attack !== "object") {
    throw new Error(`Invalid attack used by ${attackerTrainer.name}`);
  }

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

     movesLog.push({
      pokemon: first.trainer.getActivePokemon().name,
      move: first.attack.name,
      damage: damage1,
    });

    let damage2 = 0;
    if (second.trainer.hasRemainingPokemon()) {
      damage2 = battleTurn(second.trainer, first.trainer, second.attack);
      movesLog.push({
        pokemon: second.trainer.getActivePokemon().name,
        move: second.attack.name,
        damage: damage2,
      });
    }
  }

  const winner = cpu1.hasRemainingPokemon() ? cpu1.name : cpu2.name;
  return {
    winner,
    movesLog,
  };
}
async function userVsCpuTurn(user, cpu, optionAttack ) {
  const userPkmn = user.getActivePokemon();
  const cpuPkmn = cpu.getActivePokemon();

  const userMove = optionAttack;
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
