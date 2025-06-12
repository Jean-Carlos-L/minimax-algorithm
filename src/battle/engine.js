import calculateDamage from "./damage.js";
import { chooseBestMove, getStrongestAttack } from "./minimax.js";

/**
 * @param {object} attackerTrainer - Entrenador que ataca en este turno
 * @param {object} defenderTrainer - Entrenador que recibe el ataque
 * @param {object} attack - Movimiento que será utilizado
 * @returns {object} - Daño causado y penalización aplicada (si hay)
 */
function battleTurn(attackerTrainer, defenderTrainer, attack) {
  if (!attack || typeof attack !== "object") {
    throw new Error(`Invalid attack used by ${attackerTrainer.name}`);
  }

  const attacker = attackerTrainer.getActivePokemon();
  const defender = defenderTrainer.getActivePokemon();

  const damage = calculateDamage(attacker, defender, attack);
  defender.receiveDamage(damage);


  let penalty = 0;
  const strongestAttack = getStrongestAttack(attacker, defender);
  if (attack.name === strongestAttack.name) {
    penalty = Math.floor(attacker.hp * 0.1);
    attacker.receiveDamage(penalty);
  }
  return {damage, penalty};
}

/**
 * @param {object} cpu1 - Primer entrenador CPU
 * @param {object} cpu2 - Segundo entrenador CPU
 * @returns {object} - Nombre del ganador y registro de movimientos
 */
function cpuVsCpuBattle(cpu1, cpu2) {

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
      damage: damage1.damage,
      penalty: damage1.penalty,
    });

    let damage2 = 0;
    if (second.trainer.hasRemainingPokemon()) {
      damage2 = battleTurn(second.trainer, first.trainer, second.attack);
      movesLog.push({
        pokemon: second.trainer.getActivePokemon().name,
        move: second.attack.name,
        damage: damage2.damage,
        penalty: damage2.penalty,
      });
    }
  }

  const winner = cpu1.hasRemainingPokemon() ? cpu1.name : cpu2.name;
  return {
    winner,
    movesLog,
  };
}
/**
 * Ejecuta un turno de batalla entre el usuario y la CPU.
 * Se determina el orden de los ataques por velocidad y se aplica el daño correspondiente.
 *
 * @param {object} user - Entrenador jugador humano
 * @param {object} cpu - Entrenador controlado por la CPU
 * @param {object} optionAttack - Movimiento elegido por el jugador
 * @returns {object} - Detalles del turno, incluyendo ataques, daños y ganador (si hay)
 */
function userVsCpuTurn(user, cpu, optionAttack) {
  const userPkmn = user.getActivePokemon();
  const cpuPkmn = cpu.getActivePokemon();

  const userMove = optionAttack;
  const cpuMove = chooseBestMove(cpu, user);

  let first = { trainer: user, attack: userMove };
  let second = { trainer: cpu, attack: cpuMove };

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
    userPenalty: damage1.penalty,
    cpuPenalty: damage2.penalty,
    userDamage: first.trainer === user ? damage1.damage : damage2.damage,
    cpuDamage: first.trainer === cpu ? damage1.damage : damage2.damage,
    winner,
  };
}

export { battleTurn, userVsCpuTurn, cpuVsCpuBattle };
